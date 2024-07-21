import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from '../custom-modal-component/custom-modal-component.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: NgbModalRef | undefined;

  constructor(private modalService: NgbModal) {}

  openModal(message: string, isSuccess: boolean, options?: NgbModalOptions): void {
    // Configuración predeterminada de opciones
    const modalOptions: NgbModalOptions = {
      backdrop: 'static', // Predeterminado a 'static'
      keyboard: true,     // Predeterminado a true
      ...options,         // Aplica opciones proporcionadas
    };

    // Abre el modal con las opciones
    this.modalRef = this.modalService.open(CustomModalComponent, modalOptions);
    this.modalRef.componentInstance.message = message;
    this.modalRef.componentInstance.isSuccess = isSuccess;
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
