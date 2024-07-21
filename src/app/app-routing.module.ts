import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { CusuariosComponent } from './cusuarios/cusuarios.component';
import { AusuariosComponent } from './ausuarios/ausuarios.component';
import { LusuariosComponent } from './lusuarios/lusuarios.component';
import { PedidosasignadosComponent } from './pedidosasignados/pedidosasignados.component'; 
import { ConsultaComponent } from './consulta/consulta.component';
import { PaginatdpComponent } from './paginatdp/paginatdp.component';
import { CPasswordComponent } from './cpassword/cpassword.component';
import { InitloadComponent } from './initload/initload.component';
import { LogisticaComponent } from './logistica/logistica.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tdp', component: PaginatdpComponent },
  {
     path: 'home',
    component: HomeComponent,
    children: [      
      { path: 'cUsuarios', component: CusuariosComponent,canActivate: [AuthGuard]},
      { path: 'aUsuarios/:userId', component: AusuariosComponent,canActivate: [AuthGuard]},
      { path: 'lUsuarios', component: LusuariosComponent,canActivate: [AuthGuard]},
      { path: 'pasignados', component: PedidosasignadosComponent,canActivate: [AuthGuard]},
      { path: 'consulta', component: ConsultaComponent,canActivate: [AuthGuard]},
      { path: 'cpassword', component: CPasswordComponent,canActivate: [AuthGuard]},      
      { path: 'logistica', component: LogisticaComponent,canActivate: [AuthGuard]},
      { path: 'pedidos', component: PedidoDetalleComponent,canActivate: [AuthGuard]},
      { path: 'load', component: InitloadComponent, canActivate: [AuthGuard]},
    ]
  },
];



    /* path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'pedidos', component: PedidoDetalleComponent},
      { path: 'cUsuarios', component: CusuariosComponent},
      { path: 'aUsuarios/:userId', component: AusuariosComponent},
      { path: 'lUsuarios', component: LusuariosComponent},
      { path: 'pasignados', component: PedidosasignadosComponent},
      { path: 'consulta', component: ConsultaComponent},
      { path: 'cpassword', component: CPasswordComponent},
      { path: 'load', component: InitloadComponent},
      { path: 'logistica', component: LogisticaComponent},
    ]
  },
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
