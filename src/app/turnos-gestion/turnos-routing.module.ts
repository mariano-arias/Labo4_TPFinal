import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnoSolicitudComponent } from '../components/turno-solicitud/turno-solicitud.component';
import { TurnosComponent } from '../pages/turnos/turnos.component';

const routes: Routes = [
  {
    path: '',
    component: TurnosComponent,
  },
  {
    path: 'solicitud', component: TurnoSolicitudComponent
  },
  {
    path: 'mis-turnos', component: TurnosComponent
  }
  ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TurnosRoutingModule { }
