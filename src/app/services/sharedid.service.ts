import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedIdService {
  private readonly USER_ROLE_KEY = 'userRole';
  
  private userRoleSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  userRole$: Observable<number> = this.userRoleSubject.asObservable();

  constructor() {
    // Recupera el ID del rol almacenado al inicializar el servicio
    const storedUserRole = localStorage.getItem(this.USER_ROLE_KEY);
    if (storedUserRole) {
      this.userRoleSubject.next(+storedUserRole);
    }
  }

  getUserRole(): Observable<number> {
    return this.userRole$;
  }

  setUserRole(role: number): void {
    // Almacena el ID del rol en el localStorage
    localStorage.setItem(this.USER_ROLE_KEY, role.toString());
    this.userRoleSubject.next(role);
  }

  clearUserRole(): void {
    // Limpia el ID del rol del localStorage y del BehaviorSubject
    localStorage.removeItem(this.USER_ROLE_KEY);
    this.userRoleSubject.next(0);
  }

  updateRole(role: number): void {
    this.userRoleSubject.next(role);
  }
}
