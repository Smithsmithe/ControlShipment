// rol-user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolUserService {
  private apiUrl = 'http://localhost:8687/api/Rol/RolUsuario';
  private roleIdSubject = new BehaviorSubject<number | null>(null);
  roleId$ = this.roleIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  getRolesByEmail(email: string): Observable<any[]> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.get<any[]>(url);
  }

  setRoleId(roleId: number | null) {
    this.roleIdSubject.next(roleId);
  }
}
