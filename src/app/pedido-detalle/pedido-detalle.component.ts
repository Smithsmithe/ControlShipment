import { Component, OnInit } from '@angular/core';
import { ListrutasService } from '../services/listrutas.service';
import { PedidosrutaService } from '../services/pedidosruta.service';
import { ListDetalleService } from '../services/listdetalle.service';
import { StateproService } from '../services/statepro.service';
import { ListCondService } from '../services/listcond.service';
import { CshipmentService } from '../services/cshipment.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {
  listaDeRutas: any[] = [];
  showDetails: { [key: string]: boolean } = {};
  rutaSeleccionada: any;
  pedidosPorRuta: any[] = [];
  detallesPedido: any[] = [];
  detallesPedidoIndex: number | null = null;
  estadosProducto: any[] = [];
  cabeceraColor: string = '';
  conductores: any[] = []; 
  selectedPlaca: string = '';
  nombreConductor: string = '';
  nombreTransportadora: string = '';
  idConductor: any = 0;
  
  constructor(
    private listRutasServices: ListrutasService,
    private pedidosrutaService: PedidosrutaService,
    private listDetalleService: ListDetalleService,
    private stateproService: StateproService,
    private listCondService: ListCondService,
    private cshipmentService: CshipmentService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.listRutasServices.obtenerDatos().subscribe(
      (data: any[]) => {
        this.listaDeRutas = data;
      },
      error => {
        console.error('Error al obtener datos', error);
      }
    );
  
    this.stateproService.getEstadosProducto().subscribe(
      (data: any[]) => {
        this.estadosProducto = data;
      },
      error => {
        console.error('Error al obtener estados de producto', error);
      }
    );
  
  this.listCondService.getListConductores().subscribe(
    (data: any[]) => {
      this.conductores = data;
    },
    error => {
      console.error('Error al obtener conductores', error);
    }
  );
}

updateTransportData() {
  // Encuentra el conductor seleccionado
  const conductorSeleccionado = this.conductores.find(conductor => conductor.placa === this.selectedPlaca);

  // Actualiza el nombre y la transportadora
  if (conductorSeleccionado) {
    this.nombreConductor = conductorSeleccionado.nombre;
    this.nombreTransportadora = conductorSeleccionado.nombre_Transportadora;
    this.idConductor = conductorSeleccionado.idUsuario;
        
  } else {
    // Limpia los valores si no se selecciona un conductor
    this.nombreConductor = '';
    this.nombreTransportadora = '';
  }
}

  toggleDetails(selectedRuta: any) {
    console.log('showDetails:', this.showDetails);
    
      // Restablecer los detalles y checks de la ruta anterior
    if (this.rutaSeleccionada) {
      this.detallesPedido=[];
      this.showDetails[this.rutaSeleccionada] = false;
      this.detallesPedido[this.rutaSeleccionada] = undefined;
      this.selectedPlaca = '';
      
  
      // Restablecer los checks de la ruta anterior
      const detallesAnteriores = this.pedidosPorRuta.find(pedido => pedido.id_Ruta === this.rutaSeleccionada);
      if (detallesAnteriores && detallesAnteriores.detallesPedido) {
        detallesAnteriores.detallesPedido.forEach((detalle: any) => {
          detalle.check = false;
        });
      }
    }    
    
    // Cambiar el estado de visibilidad para la ruta seleccionada
    this.showDetails[selectedRuta] = true;
    this.rutaSeleccionada = selectedRuta;
    console.log('Consultando pedidos por ruta...');
  
    // Consultar los pedidos solo si la ruta está seleccionada
    this.pedidosrutaService.getPedidosPorRuta(selectedRuta).subscribe(
      (data: any[]) => {
        this.pedidosPorRuta = data;
        console.log('Pedidos por Ruta:', this.pedidosPorRuta);
  
        // Llamar a la función para verificar todos los checks
        this.checkAllVerified();
      },
      error => {
        console.error('Error al obtener pedidos por ruta', error);
      }
    );
  }
  
  loadDetallePedido(idPedido: number, index: number) {
    this.listDetalleService.getDetallePedido(idPedido).subscribe(
      (data: any[]) => {
        console.log('Datos del Detalle del Pedido:', data);
        this.detallesPedido[idPedido] = data;
        this.detallesPedidoIndex = index;
  
        // Marcar la ruta actual como cargada
        this.pedidosPorRuta[index].detallesCargados = true;
  
        // Verificar si todos los detalles del pedido para todas las rutas han cargado
        const allDetailsLoaded = this.pedidosPorRuta.every(
          (pedido: any) => pedido.detallesCargados
        );
  
        if (allDetailsLoaded) {
          this.checkAllVerified();
        }
      },
      error => {
        console.error('Error al obtener detalles del pedido', error);
      }
    );
  }

  onRutaChange() {
    this.toggleDetails(this.rutaSeleccionada);
  
    // Esperamos a que se cargue la información antes de verificar los checks
    setTimeout(() => {
      this.checkAllVerified();
    }, 100);
  }

 // Resto del código...

checkAllVerified() {
  // Establecer un indicador para rastrear si se está esperando la verificación del campo "Estado"
  let waitingForEstadoVerification = false;

 
  const allDetailsLoadedAndVerified = this.pedidosPorRuta.every((pedido: any) => {
      const detallesPedidoExist =
          this.detallesPedido[pedido.id_Pedido] &&
          this.detallesPedido[pedido.id_Pedido].length > 0;

      const detallesVerified = detallesPedidoExist
          ? this.detallesPedido[pedido.id_Pedido].every(
              (detalle: any) => {
                  // Verificar si el estado es válido (si existe) y si el check es true
                  const estadoValid = detalle.estadoSeleccionado !== undefined ? detalle.estadoSeleccionado !== null : false;
                  const checkValid = detalle.check === true;

                  // Verificar si el estado y el check son válidos
                  if (!estadoValid) {
                      waitingForEstadoVerification = true;
                      
                  }

                  return checkValid;
              }
          )
          : false;

      // Logs adicionales
      console.log('Detalles por Pedido:', this.detallesPedido);

      return detallesPedidoExist && detallesVerified;
  });

  // Agregar un log para rastrear si se está esperando la verificación del campo "Estado"
  console.log('Esperando verificación de Estado:', waitingForEstadoVerification);

  // Asignar un color a la cabecera en base al resultado de la verificación
  this.cabeceraColor = allDetailsLoadedAndVerified && !waitingForEstadoVerification ? 'lightgreen' : '';
}


crearShipment() {

  const detallesPedidoDescendente = this.detallesPedido.reverse();
  console.log('Detalles por Pedido (descendente):', detallesPedidoDescendente);
  // Verificar que la ruta, el conductor y los detalles estén disponibles
  
  const idRuta = this.rutaSeleccionada;
  const idConductor = this.idConductor;
  const muelle = 0; // Ajusta esto según el valor correcto para el muelle

  const detped = detallesPedidoDescendente
  ? detallesPedidoDescendente
      .map((detalles: any[]) => detalles?.map((detalle: any) => ({
        detalle_pedido_id: detalle.id_Detalle_Pedido,
        cantidad_aud_alistada: detalle.cantidad,
        estado_producto_id: detalle.estado_producto_id || 1
      })) || [])
      .flat()
  : [];
  console.log('detped:', detped);

  // Agrega console.log para ver los datos antes de enviarlos al servicio
  console.log('Datos antes de llamar a cshipmentService.crearShipment:', {
    idRuta,
    idConductor,
    muelle,
    detped
  });

  // Llamar al servicio para crear el Shipment
  this.cshipmentService.crearShipment(idRuta, idConductor, muelle, detped).subscribe(
    (response) => {
      console.log('Shipment creado con éxito:', response);
      this.openModal(`La ruta fue asignada al conductor ${this.nombreConductor} de manera exitosa`, true)
        .then(() => {
          // Recargar la página después de cerrar el modal
          window.location.reload();
        });
    },
    (error) => {
      console.error('Error al crear Shipment:', error);
      if (error.error && error.error.respuesta === 'La ruta ya está gestionada') {
        this.openModal('La ruta ya fue asignada no es posible reasignarla', false)
          .then(() => {
            // Recargar la página después de cerrar el modal
            window.location.reload();
          });
      } else if (error.error && error.error.respuesta === 'El conductor ya tiene asociado un shipment') {
        this.openModal('El conductor ya tiene asociado una ruta', false)
          .then(() => {
            // Recargar la página después de cerrar el modal
            window.location.reload();
          });
      } else {
        this.openModal('Error al crear Shipment', false)
          .then(() => {
            // Recargar la página después de cerrar el modal
            window.location.reload();
          });
      }
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
      // Resuelve la promesa cuando se cierra el modal
      resolve();
    });
  });
}
}