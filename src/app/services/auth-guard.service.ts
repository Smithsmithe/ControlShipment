import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { SharedIdService } from '../services/sharedid.service';
import { Observable, of } from 'rxjs';
import { switchMap, take, delay } from 'rxjs/operators';
import { ModalService } from './modal.service';
import { LoginComponent } from '../login/login.component';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sharedIdService: SharedIdService, private router: Router, private modalService: ModalService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('AuthGuard is running.');
    return this.sharedIdService.getUserRole().pipe(
      take(1),
      delay(1000),
      switchMap((userId: number) => this.checkAccess(userId, state.url))
    );
  }

  private checkAccess(userId: number, currentUrl: string): Observable<boolean> {
    console.log('Entrando en checkAccess. Rol:', userId);
  
    if (userId !== null && userId !== undefined) {
      console.log('Rol rutas', userId);
      switch (userId) {
        case 4:
          console.log('Acceso permitido para rol 4.');
          return of(true);
        case 5:
          console.log('Acceso permitido para rol 5.');
          return this.checkAccessForRole(userId, currentUrl);
        case 6:
          console.log('Acceso permitido para rol 6.');
          return this.checkAccessForRole(userId, currentUrl);
        case 7:
          console.log('Acceso permitido para rol 7.');
          return this.checkAccessForRole(userId, currentUrl);
        default:
          console.log('Acceso denegado. Redirigiendo a la página de inicio.');
          this.router.navigate(['/']); // Redirigir a la página de inicio o una página de acceso denegado
          return of(false);
      }
    } else {
      console.log('Usuario sin rol definido. Redirigiendo a la página de inicio.');
      this.router.navigate(['/']); // Redirigir a la página de inicio o una página de acceso denegado
      return of(false);
    }
  }

  private checkAccessForRole(userId: number, currentUrl: string): Observable<boolean> {
    // Verificar si el usuario tiene acceso a la ruta permitida para su rol
    if (this.isRouteAllowedForUser(userId, currentUrl)) {
      console.log('Acceso permitido para la ruta:', currentUrl);
      return of(true);
    } else {
      console.log('Acceso denegado para la ruta:', currentUrl);
      this.modalService.openModal('Ingreso no permitido con tu rol', false, { backdrop: 'static', keyboard: false });
      return of(false);
    }
  }

  private isRouteAllowedForUser(userId: number, allowedRoute: string): boolean {
    const allowedRoles = this.getAllowedRolesForRoute(allowedRoute);
    return allowedRoles.includes(userId);
  }

  private getAllowedRolesForRoute(allowedRoute: string): number[] {
    const allowedRolesMap: { [key: string]: number[] } = {
      '/home': [4, 5, 6, 7 ],
      '/home/cUsuarios': [4 ],
      '/home/aUsuarios/:userId': [4 ],
      '/home/lUsuarios': [4 ],  
      '/home/cpassword': [4, 5, 6, 7 ],
      '/home/pedidos': [4,5],
      '/home/load': [4,5],
      '/home/logistica': [4,5],
      '/home/pasignados': [4,6],
      '/home/consulta': [4,7],
      
      // Agrega otras rutas y roles permitidos según sea necesario
    };
    return allowedRolesMap[allowedRoute] || [];
  }
}
