import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateproService {
  private apiUrl = 'http://localhost:8181/api/EstadoProducto';

  constructor(private http: HttpClient) {}

  getEstadosProducto(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
