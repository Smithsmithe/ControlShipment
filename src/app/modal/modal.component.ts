import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() message: string = '';
  @Input() isSuccess: boolean = false;

  constructor(public activeModal: NgbActiveModal) {}

  reloadParentPage(): void {
    this.activeModal.close();
  }
}
