import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validaciones/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ausuarios',
  templateUrl: './ausuarios.component.html',
  styleUrls: ['./ausuarios.component.css']
})
export class AusuariosComponent {
  
  registerForm: FormGroup;
  showTransporteFields: boolean = false;
  isCreateButtonDisabled: boolean = true;
  selectedUser: any; // Almacena los detalles del usuario seleccionado

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, // Inyecta el servicio Router
    private route: ActivatedRoute, // Inyecta el servicio ActivatedRoute
    private userService: UserService // Inyecta el servicio UserService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, CustomValidators.onlyLetters(), CustomValidators.minLength(3)]],
      lastName: ['', [Validators.required, CustomValidators.onlyLetters(), CustomValidators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, CustomValidators.domainValidator(['gmail.com', 'hotmail.com', 'yahoo.com'])]],
      state: ['', [Validators.required, CustomValidators.stateValidator()]],
      area: ['', [Validators.required, CustomValidators.stateValidatortwo()]],
      placa: ['', [Validators.required, CustomValidators.placaValidator(), Validators.maxLength(6)]],
      transportadora: ['', [Validators.required, CustomValidators.transportadoraValidator()]],
    });

    if (this.registerForm.get('area')) {
      this.registerForm.get('area')?.valueChanges.subscribe((value) => {
        this.showTransporteFields = value === 'transporte';
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = +params['userId']; // El "+" convierte el parámetro en número
      this.selectedUser = this.userService.getUserById(userId);

      if (this.selectedUser) {
        this.registerForm.patchValue({
          name: this.selectedUser.name,
          lastName: this.selectedUser.lastName,
          email: this.selectedUser.email,
          state: this.selectedUser.state,
          area: this.selectedUser.area,
          placa: this.selectedUser.placa,
          transportadora: this.selectedUser.transportadora
        });
      }
    });
  }
  actualizarUsuario() {
    if (this.registerForm.valid) {
      // El formulario es válido, puedes continuar con la actualización
      const formData = this.registerForm.value;
      // Aquí debes implementar la lógica para actualizar el usuario con los datos en `formData`
      console.log('Datos del formulario:', formData);
    } else {
      // El formulario es inválido, muestra un mensaje de error o realiza alguna acción adecuada.
      console.log('El formulario contiene errores, no se puede actualizar.');
    }
  }
}