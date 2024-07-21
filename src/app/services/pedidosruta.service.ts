import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosrutaService {
  private apiUrl = 'http://localhost:8181/api/PedidosPorRuta/Pedidos';

  constructor(private http: HttpClient) {}

  getPedidosPorRuta(idRuta: number): Observable<any[]> {
    const url = `${this.apiUrl}?idruta=${idRuta}`;
    return this.http.get<any[]>(url);
  }
}
