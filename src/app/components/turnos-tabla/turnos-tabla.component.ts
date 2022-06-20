import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoriaClinica } from 'src/app/Entities/historiaClinica';
import { Turno } from 'src/app/Entities/turno';
import { Usuario } from 'src/app/Entities/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-turnos-tabla',
  templateUrl: './turnos-tabla.component.html',
  styleUrls: ['./turnos-tabla.component.css']
})
export class TurnosTablaComponent implements OnInit {


  @Input() usuarioId! : string;

  turnosCollection : string = "Turnos";
  usuariosCollection : string = 'Usuarios';
  historiasCollection: string = "Historias";


  usuario! : Usuario;
  turnos : Turno [] = [];
  turnosAuxiliar: Turno[] = [];
  historias : HistoriaClinica[]=[];
  finalizar: boolean = false;

  turnoAtencion:Turno | undefined;

  resenia!: string;

  constructor(private authService:AuthService, private firebaseService : FirebaseService,
              private interactionService : InteractionService, private router : Router,
              private modalService: ModalService) 
              {

              }

   @ViewChild('modal', { read: ViewContainerRef })
   entry!: ViewContainerRef;
   sub!: Subscription;

  ngOnInit(): void {
    
    this.authService.GetUserLogged().subscribe( 
      (res)=>{
      if(res?.uid){
      this.usuarioId = res.uid;

    this.firebaseService.GetDocFromFirebase<Usuario>( this.usuarioId, this.usuariosCollection)
    .subscribe((res)=> 
    {
      this.usuario = res!;
      if(this.usuario?.perfil == 'admin'){
        this.firebaseService.GetDocs<Turno>("Turnos") 
        .subscribe(
           (res)=> {
             this.turnos = res;
             this.turnos.forEach(
              (x)=> {
                this.firebaseService.GetDocFromFirebase<Usuario>(x.especialistaId, this.usuariosCollection)
               .subscribe((res)=> {
                 x.especialistaNombre = res?.apellido! + ", " + res?.nombre;
                })
              })
            }
         )
      }else if (this.usuario?.perfil == 'paciente')
      {
        this.firebaseService.GetDocsByFilter<Turno>(this.turnosCollection, "pacienteId",this.usuario!.uid)
        .subscribe(
          (res)=> {
            this.turnos = [];
            res.forEach((element: any) =>{
              this.turnos?.push({
                id : element.payload.doc.id,
                ...element.payload.doc.data()
              })
            });
            this.turnos.forEach(
              (x)=> {
                this.firebaseService.GetDocFromFirebase<Usuario>(x.especialistaId, this.usuariosCollection)
               .subscribe((res)=> {
                 x.especialistaNombre = res?.apellido! + ", " + res?.nombre;
                  }
                  )
                }
            )
          }
        )
      }
      else
      {
        this.firebaseService.GetDocsByFilter<Turno>(this.turnosCollection, "especialistaId",this.usuario!.uid)
        .subscribe(
          (res)=> 
          {
            this.turnos = [];
            res.forEach((element: any) =>{
              this.turnos?.push(
                {
                id : element.payload.doc.id,
                ...element.payload.doc.data()
                })
              });
              
            this.turnos.forEach(
              (x)=> {
                this.firebaseService.GetDocFromFirebase<Usuario>(x.especialistaId, this.usuariosCollection)
                .subscribe((res)=> {
                  x.especialistaNombre = res?.apellido! + ", " + res?.nombre;
                })
              })
              this.turnos.forEach(
                (x)=> {
                  this.firebaseService.GetDocFromFirebase<Usuario>(x.pacienteId, this.usuariosCollection)
                  .subscribe((res)=> {
                    x.pacienteNombre = res?.apellido! + ", " + res?.nombre;
                  })
                })
         }
         );
         }
       })
     }
  })
}


   // this.firebaseService.GetDocsByFilter<Turno>(this.turnosCollection, 'pacienteId', this.usuarioId)


  GetDataUser (user : any){
    
    this.firebaseService.GetDocFromFirebase<Usuario>(user, this.usuariosCollection)
     .subscribe((res)=> {
       this.usuario = res!;
       console.log(this.usuario);
       
     })
}

Aceptar(p: Turno){
  p.estado='aceptado';
  this.firebaseService.UpdateDoc<Turno>(this.turnosCollection, p!.id, p);
}

Finalizar(p: Turno){
  p.estado='realizado';
  this.turnoAtencion=p;
  //this.firebaseService.UpdateDoc<Turno>(this.turnosCollection, p!.id, p);
  this.finalizar = true;
}
Cancelar(p: Turno){
  p.estado='cancelado';
  this.firebaseService.UpdateDoc<Turno>(this.turnosCollection, p!.id, p);
}
VerResenia(p: Turno){
  console.log(p.id);
  this.resenia = "";
  this.firebaseService.GetDocsByFilter("Historias", "turnoId", p.id)
  .subscribe(
    (res)=>{
      this.historias = [];
      res.forEach((element: any) =>{
        this.historias?.push({
          id : element.payload.doc.id,
          ...element.payload.doc.data()
        }
          )
      });
    }
  )
  console.log(this.historias);
  this.historias.forEach(
    x=>this.resenia = x.texto
  )

  this.openModal(this.resenia);
}
Rechazar(p: Turno){
  p.estado='rechazado';
  this.firebaseService.UpdateDoc<Turno>(this.turnosCollection, p!.id, p);
}
Encuestar(){

}
Calificar(){

}

titulo!: string;

openModal(t :string) {
 // if(t.estado=='realizado'){
   this.titulo = 'Reseña'
   this.sub = this.modalService
   .openModal(this.entry, this.titulo,t)
   .subscribe((v) => {
     //
    });
 // }
  // if(t.estado=='cancelado'){
  //   this.titulo = 'Motivo cancelacion'
  //   this.sub = this.modalService
  //   .openModal(this.entry, this.titulo, "nada")
  //   .subscribe((v) => {
  //     //
  //    });
  //  }
}

ngOnDestroy(): void {
  if (this.sub) this.sub.unsubscribe();
}
}
