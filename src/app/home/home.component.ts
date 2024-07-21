import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedIdService } from '../services/sharedid.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  activeMenu: string | null = null;
  menuStates: { [key: string]: boolean } = {};
  sidebarVisible = true;
  private subscription: Subscription = new Subscription();
  menuOpen: boolean = false;

  constructor(
    private router: Router,
    private sharedIdService: SharedIdService,
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.sharedIdService.getUserRole().subscribe(userId => {
        console.log('Rol de visualización:', userId);

        // Redirige según el valor obtenido
        switch (userId) {
          case 4:
            this.router.navigate(['/home/cUsuarios']);
            break;
          case 5:
            this.router.navigate(['/home/logistica']);
            break;
          case 6:
            this.router.navigate(['/home/pasignados']);
            break;
          case 7:
            this.router.navigate(['/home/consulta']);
            break;
          default:
            // Página predeterminada o lógica adicional según tus necesidades
            break;
        }
      })
    );
  }

  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    this.subscription.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  setActiveMenu(menu: string) {
    if (this.activeMenu === menu) {
      this.activeMenu = null;
      this.menuStates[menu] = false;
    } else {
      this.activeMenu = menu;
      this.menuStates[menu] = true;
    }
  }

  isMenuOpen(menu: string): boolean {
    return this.activeMenu === menu;
  }

  navigateToLogin() {
    this.router.navigate(['/'], { replaceUrl: true }).then(() => {
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  changePassword(): void {
    // Implementa la lógica para cambiar la contraseña aquí
    console.log('Cambiar Contraseña');
  }

  logout(): void {
    // Implementa la lógica para cerrar sesión aquí
    console.log('Cerrar Sesión');
    this.sharedIdService.clearUserRole();

    // Redirigir a la página de inicio o a donde sea necesario
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }

  toggleUserMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();  // Evita la propagación del evento al documento
    this.menuOpen = !this.menuOpen;  // Toggle the user menu
  }
}
