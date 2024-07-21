import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-lusuarios',
  templateUrl: './lusuarios.component.html',
  styleUrls: ['./lusuarios.component.css']
})
export class LusuariosComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {} // Inyecta el servicio Router

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  editarUsuario(userId: number) {
    // Navega a la página de actualización junto con el ID del usuario
    this.router.navigate(['/home/aUsuarios', userId]);
  }
}
