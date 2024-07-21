// gestionshipment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GestionShipmentService {
  private apiUrl = 'http://localhost:8181/api/CrearShipment/gestionshiptransp';

  constructor(private http: HttpClient) {}

  gestionShipment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
