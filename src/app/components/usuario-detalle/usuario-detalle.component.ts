import { Component, Input, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/Entities/historiaClinica';
import { Turno } from 'src/app/Entities/turno';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() usuario : Usuario | undefined;
  @Input() userPhoto : string | undefined;
  turnos: Turno [] = [];
  historial: HistoriaClinica[] = [];
  
  userUpdated : Usuario | undefined;
  constructor(private storageService : StorageService, private firebaseService : FirebaseService,
              private interactionService: InteractionService) { 
  }

  ngOnInit(): void {
   
  }

  ActivarUsuario(){
  console.log(this.usuario);
 
    this.GuardarCambios()
  }

  VerHistoria(){
    // this.firebaseService.GetDocsByFilter<Turno>("Turnos", 'pacienteId', this.usuario?.uid!)
    // .subscribe((res)=>{
    //   this.turnos=[];
    //   res.forEach((element: any) =>{
    //     this.turnos?.push({
    //       id : element.payload.doc.id,
    //       ...element.payload.doc.data()
    //     })
    //     console.log("tutnos", this.turnos);
        

  this.firebaseService.GetDocsByFilter<HistoriaClinica>("Historias", 'pacienteId', this.usuario?.uid!)
           .subscribe(
             (res)=>{
              this.historial=[];
               res.forEach((element: any) =>{
               this.historial?.push({
                 id : element.payload.doc.id,
                 ...element.payload.doc.data()
               })
             })
             }
           )
  }

  GuardarCambios( ){
// console.log(this.usuario);

//     this.firebaseService.Update<Usuario>(u.uid, u).then(
//     (res)=>{
//     console.log(res);
//     })
//     .catch(
//       ()=> this.interactionService.showError("Ha ocurrido un error", "Error")
//     )
//   }
  }
}
