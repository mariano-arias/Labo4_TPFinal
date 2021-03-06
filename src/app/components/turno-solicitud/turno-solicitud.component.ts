import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Usuario } from 'src/app/Entities/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import esLocale from '@fullcalendar/core/locales/es';
import { Turno } from 'src/app/Entities/turno';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/Entities/especialidad';

@Component({
  selector: 'app-turno-solicitud',
  templateUrl: './turno-solicitud.component.html',
  styleUrls: ['./turno-solicitud.component.css']
})

export class TurnoSolicitudComponent implements OnInit {

  collectionTurnos : string = 'Turnos';
  collectionUsuarios : string = 'Usuarios';
  turno : Turno  = new Turno;
  perfilPaciente : string = "paciente";
  perfilEspecialista : string = "especialista";
  usuarioLogueado : Usuario | undefined;
  especialista : Usuario | undefined;
  especialistas : Usuario[] =[];
  pacienteTurno : Usuario | undefined;
  especialidades:Especialidad[] | undefined;
  
  Events: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',//'timeGridDay',
  //   dayCount: 14,
    slotMinTime: '09:00:00',
    slotMaxTime: '19:00:00',
    selectable: true,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    select: this.SelectedTurno.bind(this),
    events: [ ],
    headerToolbar:{
      left: 'prev,next',
      center: 'title',
     // right: 'timeGridDay',
      right: ''
    },
    locale: esLocale,
    hiddenDays: [0],
    businessHours: {
      startTime: '09:00',
      endTime: '19:00'
    },
    allDaySlot: false,
   // fixedWeekCount: false
    // duration: { days: 4 },
    // visibleRange: function(currentDate){
    //   const startDate = new Date(currentDate.valueOf());
    //   const endDate = new Date(currentDate.valueOf());
    //   startDate.setDate(startDate.getDate()); 
    //   endDate.setDate(endDate.getDate() + 5); 
  
    //   return { start: startDate, end: endDate };
    // },
    showNonCurrentDates: false
    
   // dayMaxEvents: 5
  };

  constructor(private authService:AuthService, private firebaseService : FirebaseService,
              private interactionService : InteractionService, private router : Router) 
  {
    this.authService.GetUserLogged().subscribe( (res)=>{
      if(res?.uid)
      {
      //seteo en el metodo
        this.GetDataUser(res.uid);
      }
      else
      {
        //  console.log("no user logged");
      }
    })
//test traer especialista
// this.firebaseService.GetDocFromFirebase<Usuario>("WJlzj3uJ0mPHSip1AC7G0RMGftc2", this.collectionUsuarios).subscribe(
// (res) => this.especialista = res
// )
  }

  ngOnInit(): void {
    this.firebaseService.GetDocs<Especialidad>("Especialidades")
    .subscribe
    (
      (res)=>{
        this.especialidades = [];
        this.especialidades = res;
      }
    )
  }

  GetEspecialidad(p: Especialidad){
   // this.turno.especialidadId= p.uid;
    this.turno.especialidadNombre=p.nombre;
    this.firebaseService.GetDocsByFilter<Usuario>('Usuarios', "especialidad", p.nombre)
    .subscribe
      (
        (res)=>
        {
          this.especialistas = [];
          res.forEach((element: any) =>
          {
            this.especialistas?.push({
              id : element.payload.doc.id,
              ...element.payload.doc.data()
            })
          });
          this.especialistas= this.especialistas.filter(x=>x.activo==true);
          console.log(this.especialistas);
        }
      )
  }

  Volver(){
    this.turno.especialidadNombre=null;
  }

  GetEspecialista(e: any){
    this.turno.especialistaId=e;
  //  this.turno.especialidadNombre = e.apellido + " " + e.nombre
    this.setEspecialistaView(this.turno.especialistaId);
  }

  GetPaciente(e: any){
    this.turno.pacienteId = e;
    this.setPacienteView(this.turno.pacienteId);
  }

  SelectedTurno(info : any){
    //console.log(info);
    //console.log('selected ' + info.startStr + ' to ' + info.endStr);
    this.turno.startStr = info.startStr;
    this.turno.endStr = info.endStr;
    this.calendarOptions.events=[
    {
      ...info
    }]
    //this.calendarOptions.eventsSet(info)
    //this.calendarOptions.eventAdd();
  }

  handleDateClick(arg: any) {
 //   this.calendarOptions.initialView = 'timeGridDay',
    this.turno.fecha = arg.dateStr;
  }

  Registrar()
  {
    this.interactionService.showSpinner();

    if(this.turno.fecha && this.turno.startStr)
    {
      if(this.turno.especialistaId){

        if(this.usuarioLogueado?.perfil=='admin'){
          this.turno.pacienteId = this.pacienteTurno?.uid!;
          this.turno.pacienteNombre= this.pacienteTurno?.apellido + " " + this.pacienteTurno?.nombre;
        }
        else{
          this.turno.pacienteId = this.usuarioLogueado!.uid;
          this.turno.pacienteNombre= this.usuarioLogueado?.apellido+ " " + this.usuarioLogueado?.nombre;
        }
      //  this.turno.comentario=" este es un comentario vacio";
        this.turno.estado='solicitado';
        this.turno.especialidadNombre=this.especialista?.especialidad!;
        // console.log("objeto completo",this.turno);
        this.firebaseService.CreateDoc<Turno>(this.collectionTurnos, this.turno).then(
          (res)=>
          {
            this.interactionService.showSuccess("Se ha registrado su turno. Verifique en seccion Mis Turnos", "Turno");
            this.router.navigate(['home']);
          }
          ).catch
          (
            ()=> this.interactionService.showError("Hubo un error","Error")
            //(res) => console.log(res)
            )
      }
      else
      {
        this.interactionService.showError("Falta seleccionar especialista","Error");
      }
    }
    else
    {
      this.interactionService.showError("Debe seleccionar un dia y hora","Error");
    }
  }

  GetDataUser (user : any){
    this.firebaseService.GetDocFromFirebase<Usuario>(user, this.collectionUsuarios)
    .subscribe((res)=> {
      this.usuarioLogueado = res;
    })
  }

  setEspecialistaView(uid : string){
    this.firebaseService.GetDocFromFirebase<Usuario>(uid, this.collectionUsuarios)
    .subscribe(
      (res) => this.especialista = res
    )
  }
  setPacienteView(uid : string){
    this.firebaseService.GetDocFromFirebase<Usuario>(uid, this.collectionUsuarios)
    .subscribe(
      (res) => this.pacienteTurno = res
    )
  }

  Cancelar(){
    this.router.navigate(['home']);
  }
}
