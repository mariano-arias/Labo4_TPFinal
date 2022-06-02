import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-usuario-tabla',
  templateUrl: './usuario-tabla.component.html',
  styleUrls: ['./usuario-tabla.component.css']
})
export class UsuarioTablaComponent implements OnInit {

  usuarios : Usuario [] = [];
  collection: string = "Usuarios";
  perfil: string = "Todos";

  @Output() usuarioAEditar: EventEmitter<any> = new EventEmitter<any>();

  constructor( private firebase: FirebaseService, private routes : Router,
                private interaction : InteractionService) { }

  ngOnInit(): void {
    
    this.firebase.GetDocs<Usuario>('Usuarios').subscribe(
      (res)=> {
        this.usuarios = res;
      }
    )
    
  }

  filterTable(){
    this.firebase.GetDocsBy('Usuarios', this.perfil).subscribe(
      (res)=>{
        this.usuarios = [];
        res.forEach((element: any) =>{
          this.usuarios?.push({

            
            id : element.payload.doc.id,
            ...element.payload.doc.data()
          }
            )
        })
      }    )
  }

  SetPerfil(p: string) {
    console.log(p);

      this.perfil = p;

      this.filterTable();
  }


  Editar(usuario : Usuario){
    this.usuarioAEditar.emit(usuario);
    console.log(usuario);
    

   // this.routes.navigate(["usuario-detalle"]);
  }

  Eliminar(usuario : Usuario){
    this.firebase.DeleteById(usuario.uid, this.collection).then(
      () => this.interaction.showSuccess("Usuario eliminado con éxito", "Usuario eliminado")
    )
    .catch( (error) => this.interaction.showSuccess("Hubo un error", "Error")
    )

  }

}
