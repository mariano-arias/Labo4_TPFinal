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
  collectionUsuarios : string = 'Usuarios';

  turnos : Turno [] = [];

  constructor(private authService:AuthService, private firebaseService : FirebaseService,
              private interactionService : InteractionService, private router : Router) 
              { 
                // this.firebaseService.GetDocs<Turno>(this.turnosCollection).subscribe
                // (
                //   (res)=> console.log(res)
                // )
                this.authService.GetUserLogged().subscribe( 
                  (res)=>{
                  if(res?.uid){
                  this.usuarioId = res.uid;
                console.log(this.usuarioId);

}
                })
              }




  ngOnInit(): void {
   // this.firebaseService.GetDocsByFilter<Turno>(this.turnosCollection, 'pacienteId', this.usuarioId)
   this.firebaseService.GetDocs<Turno>("Turnos") 
   .subscribe(
      (res)=> {this.turnos = res
        console.log(this.turnos);
      }
      
    )
  }

  GetDataUser (user : any){
    
    this.firebaseService.GetDocFromFirebase<Usuario>(user, this.collectionUsuarios)
     .subscribe((res)=> {
       this.usuario = res;
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
