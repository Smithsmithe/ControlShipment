import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validaciones/validators';
import { CreateUserService } from 'src/app/services/create-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-cusuarios',
  templateUrl: './cusuarios.component.html',
  styleUrls: ['./cusuarios.component.css']
})
export class CusuariosComponent {
  registerForm: FormGroup;
  showTransporteFields: boolean = false;
  isCreateButtonDisabled: boolean = true;
  isCreatingUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private createUserService: CreateUserService,
    private modalService: NgbModal,
    private zone: NgZone
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, CustomValidators.onlyLetters(), CustomValidators.minLength(3)]],
      lastName: ['', [Validators.required, CustomValidators.onlyLetters(), CustomValidators.minLength(3)]],
      numeroDocumento: ['', [Validators.required, CustomValidators.numeroDocumentoValidator()]],
      email: ['', [Validators.required, Validators.email, CustomValidators.domainValidator(['gmail.com', 'hotmail.com', 'yahoo.com', 'uan.edu.co'])]],
      area: ['', [Validators.required, CustomValidators.stateValidatortwo()]],
      placa: ['', [CustomValidators.placaValidator(), Validators.maxLength(6)]],
      transportadora: ['', [CustomValidators.transportadoraValidator()]],
    });

    if (this.registerForm.get('area')) {
      this.registerForm.get('area')?.valueChanges.subscribe((value) => {
        this.showTransporteFields = value === '6';
        this.updateButtonState();
      });
    }

    this.registerForm.statusChanges.subscribe(() => {
      this.updateButtonState();
    });
  }

  updateButtonState() {
    const isNameValid = this.registerForm.get('name')?.valid;
    const isLastNameValid = this.registerForm.get('lastName')?.valid;
    const isNumeroDocumentoValid = this.registerForm.get('numeroDocumento')?.valid;
    const isEmailValid = this.registerForm.get('email')?.valid;
    const isAreaValid = this.registerForm.get('area')?.valid;
  
    let isAdditionalFieldsValid = true;
  
    if (this.showTransporteFields) {
      const isPlacaValid = !this.registerForm.get('placa')?.hasError('required') && this.registerForm.get('placa')?.valid;
      const isTransportadoraValid = !this.registerForm.get('transportadora')?.hasError('required') && this.registerForm.get('transportadora')?.valid;
  
      if (isPlacaValid !== undefined && isTransportadoraValid !== undefined) {
        isAdditionalFieldsValid = isPlacaValid && isTransportadoraValid;
      }
    }
  
    // Deshabilitar el botón si el área es "Transportadora" (6) y al menos uno de los campos, "Placa" o "Transportadora", no está poblado o sus validaciones no son correctas
    const isTransporteArea = this.registerForm.get('area')?.value === '6';
    const isPlacaTransportadoraEmpty = !this.registerForm.get('placa')?.value && !this.registerForm.get('transportadora')?.value;
    const isPlacaTransportadoraValid = isTransporteArea ? !isPlacaTransportadoraEmpty && isAdditionalFieldsValid : isAdditionalFieldsValid;
  
    this.isCreateButtonDisabled = !(isNameValid && isLastNameValid && isNumeroDocumentoValid && isEmailValid && isAreaValid && isPlacaTransportadoraValid && !this.isCreatingUser);
  }
  
  ngOnInit() {
    // Escucha cambios en todo el formulario
    this.registerForm.valueChanges.subscribe(() => {
      this.updateButtonState();
    });
  }
  
  
  

  crearUsuario() {
    console.log('Entró en crearUsuario');
  
    if (this.registerForm.valid && !this.isCreatingUser) {
      console.log('Formulario válido. Continuando con la creación del usuario...');
  
      const nameControl = this.registerForm.get('name');
      const lastNameControl = this.registerForm.get('lastName');
      const emailControl = this.registerForm.get('email');
      const numeroDocumentoControl = this.registerForm.get('numeroDocumento');
      const areaControl = this.registerForm.get('area');
      const transportadoraControl = this.registerForm.get('transportadora');
      const placaControl = this.registerForm.get('placa');
  
      console.log('Validando controles:', nameControl, lastNameControl, emailControl, numeroDocumentoControl, areaControl, transportadoraControl, placaControl);
  
      if (nameControl && lastNameControl && emailControl && numeroDocumentoControl && areaControl) {
        console.log('Todos los controles están presentes');
  
        const usuario = {
          nombre: nameControl.value,
          apellido: lastNameControl.value,
          email: emailControl.value,
          password: numeroDocumentoControl.value.toString(),
          idrol: +areaControl.value,
          idTransportadora: 0,
          placa: 'string',          
        };
  
        if (this.showTransporteFields) {
          // Solo si showTransporteFields es true, entonces verificamos los controles de transporte y placa
          usuario.idTransportadora = transportadoraControl?.value ? +transportadoraControl.value : 0;
          usuario.placa = placaControl?.value ? placaControl.value : 'string';
        }

        // Cambia el estado a creación en curso
        this.isCreatingUser = true;
  
        console.log('Datos del usuario antes de enviar:', usuario);
  
        this.createUserService.createUser(usuario).subscribe(
          (response: any) => {
            console.log('Usuario creado exitosamente', response);
  
            // Abre el modal con el mensaje de respuesta
            this.openModal(response.respuesta, true);

            // Resetea el formulario después de enviar los datos
            this.zone.run(() => {
              this.registerForm.reset();
            });

            // Cambia el estado a creación completada
            this.isCreatingUser = false;
          },
          (error: any) => {
            console.error('Error al crear usuario', error);
  
            if (error && error.status === 400 && error.error && error.error.respuesta) {
              // Muestra el mensaje de respuesta del error en el modal
              this.openModal(error.error.respuesta, false);
            } else {
              console.error('Error desconocido:', error);
            }
            
            this.zone.run(() => {
              this.registerForm.reset();
            });

            // Cambia el estado a creación fallida
            this.isCreatingUser = false;
          }
        );
      } else {
        console.log('Algunos controles están ausentes');
      }
    } else {
      console.log('Formulario no válido o creación en curso');
      // Agregamos información adicional al log para depuración
      console.log('Estado del formulario:', this.registerForm.status);
      console.log('Errores del formulario:', this.getFormValidationErrors());
    }
  }


  // Función para obtener errores de validación del formulario
  getFormValidationErrors(): string[] {
    const errors: string[] = [];
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push(`${key} - ${keyError}`);
        });
      }
    });
    return errors;
  }

  // Método para abrir el modal con el mensaje
  openModal(message: string, isSuccess: boolean) {
  const modalRef = this.modalService.open(ModalComponent, {
    backdrop: 'static',  // Evita que se cierre al hacer clic afuera
    keyboard: false,     // Evita que se cierre al presionar la tecla Esc
  });

  modalRef.componentInstance.message = message;
  modalRef.componentInstance.isSuccess = isSuccess;
}

}
