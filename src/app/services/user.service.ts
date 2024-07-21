import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [
    { id: 1, name: 'Edward', lastName: 'Lopez',  email: 'elopez62@gmail.com', state: 'activo', area:'4' },
    { id: 2, name: 'Johan', lastName: 'Cardona',  email: 'jcardona58@uan.edu.co', state: 'activo', area:'6', placa:'DDX807', transportadora:'2' },
    // Agrega más usuarios ficticios según sea necesario
  ];

  // Método para obtener todos los usuarios
  getUsers() {
    // Implementa la lógica para obtener los usuarios aquí
    return this.users; // Debes retornar los usuarios desde tu lógica de servicio
  }

  getUserById(userId: number): any {
    // Encuentra el usuario en la lista de usuarios por su ID
    const user = this.users.find((u) => u.id === userId);
    return user;
  }
}
