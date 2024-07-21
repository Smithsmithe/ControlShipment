// tdpacepta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TdpaceptaService {
  private apiUrl = 'http://localhost:8687/api/ValidarProteccionDatos/ActivarProteccion';
  private correoAntesDeReset: string = ''; // Variable para almacenar el correo antes del reset

  constructor(private http: HttpClient) { }

  setCorreoAntesDeReset(correo: string): void {
    this.correoAntesDeReset = correo;
  }

  activarProteccionDatos(): Observable<any> {
    // Utiliza this.correoAntesDeReset en la lógica del servicio
    return this.http.post<any>(this.apiUrl, { email: this.correoAntesDeReset });
  }
}
