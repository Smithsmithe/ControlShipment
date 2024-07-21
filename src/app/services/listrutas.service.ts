import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListrutasService {
  private apiUrl = 'http://localhost:8181/api/ListarMaestros/ListarRutas';

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
