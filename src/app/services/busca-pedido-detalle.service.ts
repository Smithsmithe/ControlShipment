import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuscaPedidoDetalleService {
  private baseUrl = 'http://localhost:8181/api/ResumenShipment/BuscardorPedidoDetalle';

  constructor(private http: HttpClient) {}

  obtenerDetallePedido(idPedido: number): Observable<any> {
    const url = `${this.baseUrl}?idpedido=${idPedido}`;
    console.log('URL de solicitud:', url);
    return this.http.get(url);
  }
}
