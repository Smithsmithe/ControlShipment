import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuscadorPedidoService {
  private apiUrl = 'http://localhost:8181/api/ResumenShipment/BuscardorPedido';

  constructor(private http: HttpClient) {}

  buscarPedido(idPedido: number): Observable<any> {
    // Construye la URL con los parámetros
    const url = `${this.apiUrl}?idfiltro=${idPedido}`;

    console.log(`Realizando solicitud HTTP GET a ${url}`);

    // Realiza la solicitud HTTP GET
    return this.http.get<any>(url);
  }
}
