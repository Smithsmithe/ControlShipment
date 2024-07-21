// cshipment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CshipmentService {
  private apiUrl = 'http://localhost:8181/api/CrearShipment';

  constructor(private http: HttpClient) { }

  crearShipment(idRuta: number, idConductor: number, muelle: number, detallesPedido: any[]): Observable<any> {
    const shipmentData = {
      idruta: idRuta,
      idconductor: idConductor,
      muelle: muelle,
      detped: detallesPedido
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, shipmentData, httpOptions);
  }
}
