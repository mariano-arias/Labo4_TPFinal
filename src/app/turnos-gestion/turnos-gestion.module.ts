import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosRoutingModule } from './turnos-routing.module';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { TurnoSolicitudComponent } from '../components/turno-solicitud/turno-solicitud.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';

import { NgxSpinnerModule } from 'ngx-spinner';
import { TurnosTablaComponent } from '../components/turnos-tabla/turnos-tabla.component';
import { TurnosComponent } from '../pages/turnos/turnos.component';
import { InputComponent } from '../components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EspecialistaSearchComponent } from '../components/especialista-search/especialista-search.component';
import { SearchResultTableComponent } from '../components/search-result-table/search-result-table.component';
import { TurnoFinalizarComponent } from '../components/turno-finalizar/turno-finalizar.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    TurnoSolicitudComponent,
    TurnosComponent,
    TurnosTablaComponent,
    CalendarComponent,
    EspecialistaSearchComponent,
    SearchResultTableComponent,
    InputComponent,
    TurnoFinalizarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TurnosRoutingModule,
    FullCalendarModule, // register FullCalendar with you app
    NgxSpinnerModule
  ],
  exports:
  [CalendarComponent,
  InputComponent]
})
export class TurnosGestionModule { }
