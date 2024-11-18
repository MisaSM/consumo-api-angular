import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserModel } from '../../models/user/createuser.model';
import { UpdateUserModel } from '../../models/user/updateuser.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://localhost:44323/api/User';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  createUsuario(user: CreateUserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user);
  }
  
  updateUsuario(id: number, user: UpdateUserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${id}`, user);
  }

  deleteUsuario(id: number): Observable<UserModel> {
    return this.http.delete<UserModel>(`${this.apiUrl}/${id}`);
  }

}
