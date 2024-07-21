import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListShipmentDetalleService {
  private apiUrl = 'http://localhost:8181/api/CrearShipment/Listarshipment_detalle';

  constructor(private http: HttpClient) {}

  getListShipmentDetalle(idPedido: number): Observable<any> {
    const url = `${this.apiUrl}?id_pedido=${idPedido}`;

    // Imprimir la solicitud HTTP
    console.log(`Solicitud HTTP a ${url}`);

    return this.http.get<any>(url);
  }
}
