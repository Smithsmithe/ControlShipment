// list-shipment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ListShipmentService {
  private apiUrl = 'http://localhost:8181/api/CrearShipment/Listarshipment';

  constructor(private httpClient: HttpClient) { }

  getListShipment(conductorId: string): Observable<any> {
    const url = `${this.apiUrl}?conductor=${conductorId}`;
    console.log('URL de la solicitud:', url);
  
    return this.httpClient.get<any>(url)
  }
}
