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
            
                // this.firebaseService.GetDocs<Turno>(this.turnosCollection).subscribe
                // (
                //   (res)=> console.log(res)
                // )


              }




  ngOnInit(): void {
    
    this.authService.GetUserLogged().subscribe( 
      (res)=>{
      if(res?.uid){
      this.usuarioId = res.uid;
    console.log(this.usuarioId);
    this.firebaseService.GetDocFromFirebase<Usuario>( this.usuarioId, this.usuariosCollection)
    .subscribe((res)=> {
      this.usuario = res;
      console.log(this.usuario);
      if(this.usuario?.perfil == 'admin'){
        this.firebaseService.GetDocs<Turno>("Turnos") 
        .subscribe(
           (res)=> {this.turnos = res
           }
         )
      }else{
        this.firebaseService.GetDocsByFilter<Turno>(this.turnosCollection, "pacienteId",this.usuario!.uid)
        .subscribe(
          (res)=> {
            console.log(res);
            
            this.turnos = [];
            res.forEach((element: any) =>{
              this.turnos?.push({
                id : element.payload.doc.id,
                ...element.payload.doc.data()
              }
                )
            });
          }
        )
      }
      
    })

}
  })
   // this.firebaseService.GetDocsByFilter<Turno>(this.turnosCollection, 'pacienteId', this.usuarioId)
  
  }

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
