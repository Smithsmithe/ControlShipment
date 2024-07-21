import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { TdpService } from '../services/tdp.service';
import { TdpaceptaService } from '../services/tdpacepta.service';
import { RolUserService } from '../services/roluser.service';
import { SharedIdService } from '../services/sharedid.service';
import { Router } from '@angular/router';

// Importaciones omitidas por brevedad

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  correoInvalido: boolean = false;
  error401: boolean = false;
  error401Message: string = '';
  errorMessage: string = '';
  showErrorMsg:boolean = false;
  correoAntesDeReset: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private tdpService: TdpService,
    private tdpaceptaService: TdpaceptaService,
    private rolUserService: RolUserService,
    private sharedIdService: SharedIdService,
    private router: Router,
  ) {}

  validarCorreo() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.correoInvalido = this.correo ? !emailPattern.test(this.correo) : false;
    this.correoAntesDeReset = this.correo;
    console.log('Correo antes de reset:', this.correoAntesDeReset);
  }

  mostrarErrorPorCincoSegundos() {
    setTimeout(() => {
      this.error401 = false;
      this.error401Message = '';
      this.errorMessage = '';
    }, 3000);
  }

  async onSubmit() {
    if (!this.correo || this.correo.trim() === '' || this.correoInvalido) {
      console.error('Correo no válido');
      const idRolQuemado = 5;
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = `email=${encodeURIComponent(this.correo)}&password=${encodeURIComponent(this.contrasena)}`;

    try {
      const response: any = await this.http.post('http://localhost:8686/getTokenLogin', body, { headers }).toPromise();
      console.log('peticion token:', response);

      if (response && response.token) {
        const nuevoBody = `loginToken=${encodeURIComponent(response.token)}`;
        this.authService.enviarTokenAlNuevoServicio(nuevoBody, headers).subscribe(
          (nuevaRespuesta) => {
            console.log('token:', nuevaRespuesta);

            this.tdpaceptaService.setCorreoAntesDeReset(this.correoAntesDeReset);

            this.tdpService.validarProteccionDato(this.correoAntesDeReset).subscribe(
              (tdpRespuesta) => {
                console.log('Respuesta del servicio TdpService:', tdpRespuesta);
                this.tdpService.redirigirSegunRespuesta(tdpRespuesta);
              },
              (tdpError) => {
                console.error('Error al llamar al servicio TdpService:', tdpError);
              }
            );

            this.rolUserService.getRolesByEmail(this.correoAntesDeReset).subscribe(
              (roles) => {
                console.log('Roles obtenidos:', roles);
                if (roles && roles.length > 0) {
                  console.log('Rol obtenido:', roles[0].id_Rol);
                  this.sharedIdService.setUserRole(roles[0].id_Rol);
                } else {
                  console.log('No se encontraron roles para el usuario.');
                }
              },
              (error) => {
                console.error('Error al obtener roles', error);
              }
            );
          },
          (error) => {
            // Manejar el error del servicio AuthService aquí
            if (error.status === 401) {
              this.error401 = true;
              this.error401Message = 'Correo o Contraseña incorrectos, Por favor, verifica e inténtelo nuevamente.';
              this.mostrarErrorPorCincoSegundos();
            }
            else {
              console.error('Error al llamar al servicio AuthService:', error);
            }
          }
        );
      } else {
        console.error('La respuesta del servicio es indefinida o no contiene un token.');
      }

      this.correo = '';
      this.contrasena = '';
    } catch (error: any) {
      // Manejar el error general aquí
      if (error.status === 401) {
        this.error401 = true;
        this.error401Message = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
      } else {
        console.error('Error inesperado:', error);
      }
    }
  }
}
