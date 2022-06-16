import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/Entities/turno';
import { Usuario } from 'src/app/Entities/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-turnos-tabla',
  templateUrl: './turnos-tabla.component.html',
  styleUrls: ['./turnos-tabla.component.css']
})
export class TurnosTablaComponent implements OnInit {

  @Input() usuarioId! : string;

  turnosCollection : string = "Turnos";

  usuario : Usuario | undefined;

  usuariosCollection : string = 'Usuarios';

  turnos : Turno [] = [];

  constructor(private authService:AuthService, private firebaseService : FirebaseService,
              private interactionService : InteractionService, private router : Router) 
              {

              }




  ngOnInit(): void {
    
    this.authService.GetUserLogged().subscribe( 
      (res)=>{
      if(res?.uid){
      this.usuarioId = res.uid;

    this.firebaseService.GetDocFromFirebase<Usuario>( this.usuarioId, this.usuariosCollection)
    .subscribe((res)=> 
    {
      this.usuario = res;
      if(this.usuario?.perfil == 'admin'){
        this.firebaseService.GetDocs<Turno>("Turnos") 
        .subscribe(
           (res)=> {
             this.turnos = res;
             this.turnos.forEach(
              (x)=> {
                this.firebaseService.GetDocFromFirebase<Usuario>(x.especialistaId, this.usuariosCollection)
               .subscribe((res)=> {
                 x.especialistaId = res?.apellido! + "- " + res?.especialidad
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
                 x.especialistaId = res?.apellido! + "- " + res?.especialidad
                })
              })
          }
        )
      }
      else
      {
        console.log("soy");
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
                  x.especialistaId = res?.apellido! + ", " + res?.nombre;
                })
              })
              this.turnos.forEach(
                (x)=> {
                  this.firebaseService.GetDocFromFirebase<Usuario>(x.pacienteId, this.usuariosCollection)
                  .subscribe((res)=> {
                    x.pacienteId = res?.apellido! + ", " + res?.nombre;
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
       this.usuario = res;
       console.log(this.usuario);
       
     })
}
Cancelar(){

}
VerResenia(){

}

Encuestar(){

}
Calificar(){

}
}
