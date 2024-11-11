import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TareaModel } from '../../models/tarea/tarea.model';
import { CreateTareaModel } from '../../models/tarea/createtarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'https://localhost:44323/api/Tarea';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<TareaModel[]> {
    return this.http.get<TareaModel[]>(this.apiUrl);
  }

  createTareas(tarea: CreateTareaModel): Observable<TareaModel> {
    return this.http.post<TareaModel>(this.apiUrl, tarea);
  }
}