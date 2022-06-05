import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Usuario } from 'src/app/Entities/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import esLocale from '@fullcalendar/core/locales/es';
import { Turno } from 'src/app/Entities/turno';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turno-solicitud',
  templateUrl: './turno-solicitud.component.html',
  styleUrls: ['./turno-solicitud.component.css']
})
export class TurnoSolicitudComponent implements OnInit {

  collectionTurnos : string = 'Turnos';
  collectionUsuarios : string = 'Usuarios';
  turno : Turno  = new Turno;

  Events: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
    selectable: true,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    select: this.SelectedTurno.bind(this),
    events: [
      { title: 'event 1', date: '2022-06-06' },
      { title: 'event 2', date: '2022-06-05' }
    ],
    headerToolbar:{
      left: 'prev,next',
      center: 'title',
      right: 'timeGridDay,dayGridMonth',
    },
    locale: esLocale,
    weekends: false,
    businessHours: {
      startTime: '08:00',
      endTime: '18:00'
    },
    
   // dayMaxEvents: 5

  };


SelectedTurno(info : any){
  console.log('selected ' + info.startStr + ' to ' + info.endStr);
    
  this.turno.startStr = info.startStr;
  this.turno.endStr = info.endStr;
  console.log(this.turno);
  
}

  handleDateClick(arg: any) {
    console.log('date click! ' + arg.dateStr)
    this.turno.fecha = arg.dateStr;
  }
  
  
  usuario : Usuario | undefined;
  especialista : Usuario | undefined;

  constructor(private authService:AuthService, private firebaseService : FirebaseService,
              private interactionService : InteractionService, private router : Router) { 
    this.authService.GetUserLogged().subscribe( (res)=>{
      if(res?.uid){
        //console.log("usuer logged: ", res);
        this.GetDataUser(res.uid);
      }
      else{
        console.log("no user logged");
      }
      
    })

    //test traer especialista
    this.firebaseService.GetDocFromFirebase<Usuario>("WJlzj3uJ0mPHSip1AC7G0RMGftc2", this.collectionUsuarios).subscribe(
      (res) => this.especialista = res
    )
  }
  
  ngOnInit(): void {



  }

  Registrar(){
    this.interactionService.showSpinner();
    
    if(this.turno.fecha && this.turno.startStr){

      this.turno.pacienteId = this.usuario!.uid;
      this.turno.especialistaId = "WJlzj3uJ0mPHSip1AC7G0RMGftc2";
      
     // console.log("objeto completo",this.turno);
      
       this.firebaseService.CreateDoc<Turno>(this.collectionTurnos, this.turno).then(
        (res)=>{
        //  console.log(res);
          this.interactionService.showSuccess("Se ha registrado su turno", "Turno");
          this.router.navigate(['']);
        }
        ).catch
        (
          ()=>
          this.interactionService.showError("Hubo un error","Error")
          //(res) => console.log(res)
          )
          
      }else{
        this.interactionService.showError("Debe seleccionar un dia y hora","Error");
      }
  }

 GetDataUser (user : any){
    
     this.firebaseService.GetDocFromFirebase<Usuario>(user, this.collectionUsuarios)
      .subscribe((res)=> {
        this.usuario = res;
      })
  }
}
