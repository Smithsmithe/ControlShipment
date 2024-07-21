import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ListCondService } from '../services/listcond.service';
import { ListShipmentService } from '../services/list-shipment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ListShipmentDetalleService } from '../services/list-shipment-detalle.service';
import { StateproService } from '../services/statepro.service';
import { ModalComponent } from '../modal/modal.component';
import { GestionShipmentService } from '../services/gestionshipment.service';

interface ShipmentDetail {
  id_detalle_pedido: number;  // Ajusta el tipo según corresponda
  sku: string;
  descripcion: string;
  cantidad_pedido: number;
  unidadempaque: string;
  estadoSeleccionado: string;
  cantidadRecibida: number;
  observaciones: string;
  check: boolean;
  allCardsVerified: boolean;
  // Agrega más propiedades según sea necesario
}


@Component({
  selector: 'app-pedidosasignados',
  templateUrl: './pedidosasignados.component.html',
  styleUrls: ['./pedidosasignados.component.css']
})
export class PedidosasignadosComponent {
  selectedPlaca: string = '';
  nombreConductor: string = '';
  nombreTransportadora: string = '';
  conductores: any[] = [];
  idConductor: any = 0;
  response: any[] = [];
  selectedShipment: any = null;
  estadosProducto: any[] = [];
  allCardsVerified: boolean = false;

  constructor(
    private listCondService: ListCondService,
    private listShipmentService: ListShipmentService,
    private modalService: NgbModal,
    private listShipmentDetalleService: ListShipmentDetalleService,
    private cd: ChangeDetectorRef,
    private stateproService: StateproService,
    private gestionShipmentService: GestionShipmentService
    
  ) {}

  ngOnInit() {
    this.listCondService.getListConductores().subscribe(
      (data: any[]) => {
        this.conductores = data;
      },
      (error) => {
        console.error('Error al obtener conductores', error);
      }
    );

    this.stateproService.getEstadosProducto().subscribe(
      (data: any[]) => {
        this.estadosProducto = data;
      },
      (error) => {
        console.error('Error al obtener estados de producto', error);
      }
    );
  }

  updateTransportData() {
    if (this.selectedPlaca) {
      const conductorSeleccionado = this.conductores.find(
        (conductor) => conductor.placa === this.selectedPlaca
      );

      if (conductorSeleccionado) {
        this.nombreConductor = conductorSeleccionado.nombre;
        this.nombreTransportadora = conductorSeleccionado.nombre_Transportadora;
        this.idConductor = conductorSeleccionado.idUsuario;

        this.listShipmentService
          .getListShipment(this.idConductor)
          .pipe(catchError((error) => this.handleHttpError(error)))
          .subscribe((response) => {
            console.log('Respuesta del servicio:', response);
            this.response = response;
            this.checkAllCardsVerified(); // Verificar después de actualizar la respuesta
          });
      } else {
        this.resetTransportData();
      }
    } else {
      this.resetTransportData();
    }
  }

  resetTransportData() {
    this.nombreConductor = '';
    this.nombreTransportadora = '';
    this.idConductor = 0;
    this.response = [];
    this.checkAllCardsVerified(); // Verificar después de resetear los datos
  }

  handleHttpError(error: any) {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      const errorMessage = error.error && error.error.mensaje ? error.error.mensaje : 'Error desconocido';
      console.error(`Error en la consulta HTTP: ${errorMessage}`);

      if (errorMessage === 'No se encontraron datos para el conductor especificado.') {
        this.openModal('No hay una ruta asignada aun', false).then(() => {
          window.location.reload();
        });
      }
    } else {
      console.error('Error en la consulta HTTP:', error);
      this.openModal('Error en la consulta HTTP:', false).then(() => {
        window.location.reload();
      });
    }

    return throwError(error);
  }

  verDetalle(shipment: any) {
    this.selectedShipment = shipment;
    this.cd.detectChanges();

    const idPedido = shipment.id_pedido;

    this.listShipmentDetalleService.getListShipmentDetalle(idPedido).subscribe(
      (detalle: any) => {
        console.log('Detalle del servicio:', detalle);
        this.selectedShipment.shipmentDetails = detalle;
        this.response.forEach((item) => (item.showDetails = false));
        shipment.showDetails = true;
      },
      (error: any) => {
        console.error('Error en la consulta HTTP:', error);
      }
    );
  }

  validateInput(event: any, detalle: any) {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^0-9-]/g, '');

    detalle.cantidadRecibida = +inputValue >= 0 ? +inputValue : '';

    event.target.value = detalle.cantidadRecibida;

    this.checkAllCardsVerified(); // Verificar después de cambiar la cantidad recibida
  }

  checkAllDetailsFilled(shipment: any): boolean {
    if (shipment && shipment.shipmentDetails) {
      return shipment.shipmentDetails.every(
        (detalle: ShipmentDetail) =>
          detalle.estadoSeleccionado && detalle.cantidadRecibida >= 0 && detalle.check
      );
    }
    return false;
  }

  checkAllCardsVerified(): boolean {
    return this.response.every((shipment) => {
      return (
        shipment &&
        Array.isArray(shipment.shipmentDetails) &&
        shipment.shipmentDetails.every((detalle: ShipmentDetail) => detalle.check)
      );
    });
  }
  

  finalizarCargue(): void {
    const detalleShips: any[] = [];
  
    // Construir el array detalleShips
    this.response.forEach((shipment: any) => {
      if (shipment.shipmentDetails) {
        shipment.shipmentDetails.forEach((detalle: ShipmentDetail) => {
          const detalleCarga = {
            detalle_pedido_id: detalle.id_detalle_pedido, // Asegúrate de usar la propiedad correcta
            cantidad_auditada: detalle.cantidadRecibida || 0,
            estado_producto_id: detalle.estadoSeleccionado || 0,
            observacion: detalle.observaciones || '',
          };
          detalleShips.push(detalleCarga);
        });
      }
    });
  
    // Verificar la estructura construida imprimiéndola en la consola
    
  
    // Construir el objeto de datos para enviar al servicio
    const data = {
      id_shipment: this.selectedShipment.id_shipment, // Asegúrate de usar la propiedad correcta
      detalleShips: detalleShips,
    };
    console.log('Detalles de carga a enviar:', data);
  
    // Llamar al servicio para finalizar el cargue
    this.gestionShipmentService.gestionShipment(data).subscribe(
      (response) => {
        console.log('Cargue finalizado con éxito:', response);
        this.openModal('Se realizó la carga de la información correctamente', true).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        this.openModal('Ya realizaste la auditoria de esta ruta', false).then(() => {
          window.location.reload();
        });
      }
    );
  }

  openModal(message: string, isSuccess: boolean): Promise<void> {
    return new Promise<void>((resolve) => {
      const modalRef = this.modalService.open(ModalComponent, {
        backdrop: 'static',
        keyboard: false,
      });

      modalRef.componentInstance.message = message;
      modalRef.componentInstance.isSuccess = isSuccess;

      modalRef.result.then(() => {
        resolve();
      });
    });
  }
}
