import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html',
  styleUrls: ['./logistica.component.css']
})
export class LogisticaComponent {
  constructor(private router: Router) {}

  navigateToLoadPage() {
    this.router.navigate(['/home/load']);
  }

  navigateToPedidosPage() {
    this.router.navigate(['/home/pedidos']);
  }
}
