import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cpassword',
  templateUrl: './cpassword.component.html',
  styleUrls: ['./cpassword.component.css']
})
export class CPasswordComponent {
  correo: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmarNuevaPassword: string = '';
  correoInvalido: boolean = false;
  errorMessage: string = '';
  passwordStrengthMessage: string = '';
  
  @ViewChild('myForm', { static: false }) myForm!: NgForm;


  constructor(private http: HttpClient, private modalService: NgbModal)
 {}

  validarCorreo() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.correoInvalido = this.correo ? !emailPattern.test(this.correo) : false;
  }

  validarFortalezaContrasena() {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z]).{8,}$/;
    this.passwordStrengthMessage = regex.test(this.newPassword)
      ? ''
      : 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo.';
  }

  onSubmit() {
    // Validar que la nueva contraseña y la confirmación son iguales
    if (this.newPassword !== this.confirmarNuevaPassword) {
      this.errorMessage = 'Las contraseñas no coinciden. Verifica los valores ingresados.';
      return;
    }

    // Validar fortaleza de la contraseña
    this.validarFortalezaContrasena();

    if (this.passwordStrengthMessage) {
      // Si la contraseña no cumple con los requisitos, muestra el mensaje de error
      this.errorMessage = this.passwordStrengthMessage;
      return;
    }

    const data = {
      email: this.correo,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    this.http.post('http://localhost:8687/api/CambioPassword', data)
    .subscribe(
      (response: any) => {
        // Maneja la respuesta exitosa
        if (response && response.length > 0) {
          const respuesta = response[0].respuesta;
          if (respuesta === 'Actualizacion password extisa') {
            this.openModal('Actualización de contraseña exitosa', true);
            this.myForm.resetForm(); // Restablece el formulario usando la referencia de plantilla
            
          } else if (respuesta === 'El password anterior no coincide') {
            this.openModal('Contraseña actual no es correcta por favor verifica e intenta nuevamente', false);
          } else {
            // Maneja otros casos según sea necesario
          }
        } else {
          // Maneja el caso de una respuesta vacía o inesperada
          console.error('Respuesta inesperada del servidor');
        }
      },
      (error) => {
        // Maneja el error
        console.error(error);
        this.errorMessage = 'Error al cambiar la contraseña. Verifica tus datos.';
      }
    );
}

openModal(message: string, isSuccess: boolean) {
  const modalRef = this.modalService.open(ModalComponent, {
    backdrop: 'static',  // Evita que se cierre al hacer clic afuera
    keyboard: false,     // Evita que se cierre al presionar la tecla Esc
  });
  console.log(`Mensaje: ${message}, Éxito: ${isSuccess}`);
  modalRef.componentInstance.message = message;
  modalRef.componentInstance.isSuccess = isSuccess;
}

}