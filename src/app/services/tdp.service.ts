import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';  // Importa el Router

@Injectable({
  providedIn: 'root',
})
export class TdpService {
  private apiUrl = 'http://localhost:8687/api/ValidarProteccionDatos';

  // Agrega el Router al constructor
  constructor(private http: HttpClient, private router: Router) {}

  validarProteccionDato(email: string): Observable<any> {
    const body = { email: email };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    console.log('Enviando al servicio:', body);

    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  redirigirSegunRespuesta(respuestas: any[]): void {
    // Verificar si hay al menos un objeto en el array de respuestas
    if (respuestas && respuestas.length > 0) {
      const primeraRespuesta = respuestas[0];
  
      // Verificar la propiedad "respuesta" en el primer objeto
      if (primeraRespuesta && primeraRespuesta.respuesta === true) {
        // Redirigir al home
        this.router.navigate(['/home']);
      } else {
        // Redirigir a la página TDP
        this.router.navigate(['/tdp']);
      }
    } else {
      // Manejar el caso en el que no hay respuestas en el array
      console.error('La respuesta del servicio no contiene objetos.');
    }
  }
}
