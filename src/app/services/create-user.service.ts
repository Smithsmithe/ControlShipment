// create-user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private apiUrl = 'http://localhost:8687/api/CrearUsuario';

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
