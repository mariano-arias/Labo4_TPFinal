import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MenuComponent } from './shared/menu/menu.component';
import { UsuarioDetalleComponent } from './components/usuario-detalle/usuario-detalle.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent,
    children: [
      {
        path: 'usuarios', 
        component: UsuarioComponent
      },
      {
        path:"usuario-detalle", component: UsuarioDetalleComponent
      },
      {
        path: 'perfil', component: PerfilComponent
      },
      {
        path: 'pacientes', component: PacientesComponent
      },
      {
        path: 'especialidades', component: EspecialidadesComponent
      },
      {
        path: 'turnos', 
        loadChildren: () => import('./turnos-gestion/turnos-gestion.module').then(m => m.TurnosGestionModule)
      }
    ]
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registro', component: RegistroComponent
  },
  {
    path: '**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
