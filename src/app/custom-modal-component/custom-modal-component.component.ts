import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-modal-component',
  templateUrl: './custom-modal-component.component.html',
  styleUrls: ['./custom-modal-component.component.css']
})
export class CustomModalComponent {
  @Input() message: string = '';
  @Input() isSuccess: boolean = false;

  constructor(public activeModal: NgbActiveModal) {}
  

  closeModal(): void {
    this.activeModal.close();
  }

  reloadParentPage(): void {
    this.closeModal();
  }
}
