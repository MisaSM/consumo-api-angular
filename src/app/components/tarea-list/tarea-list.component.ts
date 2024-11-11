import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'; 
import { TareaService } from '../../services/tarea/tarea.service';
import { TareaModel } from '../../models/tarea/tarea.model';
@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [ButtonModule, DropdownModule, DialogModule, TableModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tarea-list.component.html',
  animations: [
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
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent {
  tareas: TareaModel[] = [];
  displayDialog: boolean = false;
  tareaForm!: FormGroup;
  usuarios: any[] = [];

  constructor(private fb: FormBuilder, private tareaService: TareaService) {}

  ngOnInit() {
    this.tareaForm = this.fb.group({
      idTarea: [null], //campo oculto para el ID
      tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
      completada: [false],
      usuarioo: [null, Validators.required],
    });

    this.loadTareas();
  }

  loadTareas() {
    console.log("Metodo loadtareas uwu");
    this.tareaService.getTareas().subscribe((data) => {
      this.tareas = data;
      console.log(this.tareas);
    });
  }

  openDialog()  {
    this.displayDialog = true;
  }
}
