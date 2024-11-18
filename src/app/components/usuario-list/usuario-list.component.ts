import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'; 
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UserModel } from '../../models/user/user.model';
@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [ButtonModule, DropdownModule, DialogModule, TableModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario-list.component.html',
  providers: [DialogService],
  animations:[
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms 0s ease-in')
      ]),
      transition(':leave', [
        animate('500ms 0s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ],
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent {
  usuarios: UserModel[] = [];
  displayDialog: boolean = false;
  usuarioForm!: FormGroup;
  isEditing: boolean = false;
  constructor(private fb:FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      iduser: [null], //campo oculto para el ID
      names: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      console.log(data);
      this.usuarios = data;
    });
  }

  saveUsuario() {
    if (this.usuarioForm.valid) {
      const usuarioData = this.usuarioForm.value;
      if (this.isEditing) {
        this.updateUsuario(usuarioData);
      } else {
        this.createUsuario(usuarioData);
      }
    }
  }

  openDialog(usuario?: any) {
    this.displayDialog = true;
    console.log(usuario);
    this.isEditing = usuario;
    if (usuario) {
      this.usuarioForm.patchValue({
        iduser: usuario.idUsuario,
        names: usuario.nombres,
        userName: usuario.usuario,
        password: '',
      });
      console.log(this.usuarioForm.value);
    } else {
      this.usuarioForm.reset();
    }
  } 

  createUsuario(usuario: any) {
    this.usuarioService.createUsuario({
      names: usuario.names,
      userName: usuario.userName,
      password: usuario.password,
    }).subscribe(() => {
      this.loadUsuarios();
      this.displayDialog = false;
    })
  }

  updateUsuario(usuario: any) {
    this.usuarioService.updateUsuario(usuario.iduser,{
      names: usuario.names,
      userName: usuario.userName,
      password: usuario.password,
    }).subscribe(() => {
      this.loadUsuarios();
      this.displayDialog = false;
    })
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.loadUsuarios();
    })
  }

}
