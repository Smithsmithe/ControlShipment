import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8686/loginByToken';

  constructor(private http: HttpClient) {}

  enviarTokenAlNuevoServicio(body: string, headers: HttpHeaders): Observable<any> {
    return this.http.post(this.loginUrl, body, { headers });
  }
}
