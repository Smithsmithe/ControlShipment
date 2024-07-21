import { Component } from '@angular/core';
import { TdpaceptaService } from '../services/tdpacepta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginatdp',
  templateUrl: './paginatdp.component.html',
  styleUrls: ['./paginatdp.component.css']
})
export class PaginatdpComponent {
  constructor(private tdpaceptaService: TdpaceptaService, private router: Router) {}

  acceptDataTreatment() {
    // Llamada al servicio TdpaceptaService cuando se acepta
    this.tdpaceptaService.activarProteccionDatos().subscribe(
      (response) => {
        console.log('Respuesta del servicio TdpaceptaService:', response);
        // Realizar acciones adicionales si es necesario

        // Redirección después de aceptar
        this.router.navigate(['/home']); // Reemplaza '/nueva-ruta' con la ruta a la que deseas redirigir
      },
      (error) => {
        console.error('Error al llamar al servicio TdpaceptaService:', error);
        // Manejar errores según tus necesidades
      }
    );
  }

  redirigirAEnlaceExterno(): void {
    // Abre el enlace en una nueva pestaña
    window.open('https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981', '_blank');
  }
}
