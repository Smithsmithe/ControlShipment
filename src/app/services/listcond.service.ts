// listcond.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListCondService {

  private apiUrl = 'http://localhost:8181/api/ListarMaestros/ListarConductor';

  constructor(private http: HttpClient) {}

  getListConductores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
