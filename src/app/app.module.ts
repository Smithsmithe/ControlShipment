// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { CusuariosComponent } from './cusuarios/cusuarios.component';
import { AusuariosComponent } from './ausuarios/ausuarios.component';
import { LusuariosComponent } from './lusuarios/lusuarios.component';
import { PedidosasignadosComponent } from './pedidosasignados/pedidosasignados.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { PaginatdpComponent } from './paginatdp/paginatdp.component';
import { ModalComponent } from './modal/modal.component';
import { AuthGuard } from './services/auth-guard.service';
import { CustomModalComponent } from './custom-modal-component/custom-modal-component.component';
import { CPasswordComponent } from './cpassword/cpassword.component';
import { InitloadComponent } from './initload/initload.component';
import { LogisticaComponent } from './logistica/logistica.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PedidoDetalleComponent,
    CusuariosComponent,
    AusuariosComponent,
    LusuariosComponent,
    PedidosasignadosComponent,
    ConsultaComponent,
    PaginatdpComponent,
    ModalComponent,
    CustomModalComponent,
    CPasswordComponent,
    InitloadComponent,
    LogisticaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
