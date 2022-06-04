import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioDetalleComponent } from './components/usuario-detalle/usuario-detalle.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioTablaComponent } from './components/usuario-tabla/usuario-tabla.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PerfilComponent } from './pages/perfil/perfil.component';



@NgModule({
  declarations: [
    UsuarioComponent, 
    UsuarioTablaComponent,
    UsuarioDetalleComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  exports:
  [ 
    UsuarioComponent, 
    UsuarioTablaComponent,
    UsuarioDetalleComponent,
    PerfilComponent
  ]
})
export class GestionUsuariosModule { }
