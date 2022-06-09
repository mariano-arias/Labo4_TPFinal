import { Component, Input, OnInit } from '@angular/core';
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
