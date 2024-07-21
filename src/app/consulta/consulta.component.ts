import { Component } from '@angular/core';
import { BuscadorPedidoService } from '../services/buscadorpedido.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { BuscaPedidoDetalleService } from '../services/busca-pedido-detalle.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent {
  inputValue: number | null = null;
  mostrarTitulo: boolean = false;
  mostrarError: boolean = false;
  response: any[] = [];
  selectedShipment: any = null;

  constructor(
    private buscadorPedidoService: BuscadorPedidoService,
    private modalService: NgbModal,
    private buscaPedidoDetalleService: BuscaPedidoDetalleService,
    private cd: ChangeDetectorRef
  ) {}

  buscar() {
    this.mostrarTitulo = this.inputValue === 1;
  }

  validarValorIngresado() {
    this.mostrarError = (this.inputValue || 0) < 1;
  }

  esValorInvalido(): boolean {
    return this.inputValue === null || this.mostrarError;
  }

  realizarBusqueda() {
    const inputValue = this.inputValue ?? 0;

    console.log(`Realizando búsqueda para el número de pedido: ${inputValue}`);

    this.buscadorPedidoService.buscarPedido(inputValue).subscribe(
      (data) => {
        console.log(data);
        this.response = data;
      },
      (error) => {
        console.error(error);
        this.openModal('No se encontró información con los datos ingresados, por favor valide e intente nuevamente', false).then(() => {
          window.location.reload();
        });
      }
    );
  }

  obtenerDetallePedido(pedido: any) {
    this.selectedShipment = pedido;
    this.cd.detectChanges();

    const idPedido = pedido.id_pedido;

    this.buscaPedidoDetalleService.obtenerDetallePedido(pedido.id_pedido).subscribe(
      (detalle: any) => {
        console.log('Detalle del servicio:', detalle);
        this.selectedShipment.shipmentDetails = detalle;
        this.response.forEach((item) => (item.showDetails = false));
        pedido.showDetails = true;
      },
      (error: any) => {
        console.error('Error en la consulta HTTP:', error);
        this.openModal('No es posible ver el detalle por que no se a cargado el pedido al vehículo', false).then(() => {
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
