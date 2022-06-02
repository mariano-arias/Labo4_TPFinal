import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioDetalleComponent } from './components/usuario-detalle/usuario-detalle.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioTablaComponent } from './components/usuario-tabla/usuario-tabla.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    UsuarioComponent, 
    UsuarioTablaComponent,
    UsuarioDetalleComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:
  [ 
    UsuarioComponent, 
    UsuarioTablaComponent,
    UsuarioDetalleComponent
  ]
})
export class GestionUsuariosModule { }
