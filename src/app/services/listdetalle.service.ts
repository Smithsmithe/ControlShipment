// listdetalle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDetalleService {
  private apiUrl = 'http://localhost:8181/api/PedidosPorRuta/ListaPedidoDetalle';

  constructor(private http: HttpClient) {}

  getDetallePedido(idPedido: number): Observable<any[]> {
    const url = `${this.apiUrl}?idpedido=${idPedido}`;
    return this.http.get<any[]>(url);
  }
}
