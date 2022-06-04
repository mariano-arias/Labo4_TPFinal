import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-usuario-tabla',
  templateUrl: './usuario-tabla.component.html',
  styleUrls: ['./usuario-tabla.component.css']
})
export class UsuarioTablaComponent implements OnInit {

  usuarios : Usuario [] = [];
  collection: string = "Usuarios";
  perfil: string = "Todos";
  aux : any;
  
  // @Output() photoUrl : EventEmitter<any> = new EventEmitter<any>();
  @Output() usuarioAEditar: EventEmitter<any> = new EventEmitter<any>();

  constructor(  private firebase: FirebaseService, private router : Router,
                private interaction : InteractionService,
                private storageService : StorageService
              ) { }

  ngOnInit(): void 
  {
    this.firebase.GetDocs<Usuario>('Usuarios').subscribe(
      (res)=> {
        this.usuarios = res;
        // this.usuarios.forEach(
        //   (x)=>{
        //     x.photoPerfilURL =  this.storageService.GetFile(x.imagen1Name);
        //   }
        // )
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
        });
        
      }    )
  }

  SetPerfil(p: string) {

      this.perfil = p;

      this.filterTable();
  }


  Editar(usuario : Usuario){
    this.usuarioAEditar.emit(usuario);

   // this.aux = this.storageService.GetFile(usuario.imagen1Name);

  }

  Eliminar(usuario : Usuario){
    this.interaction.showSpinner();
    this.firebase.DeleteById(usuario.uid, this.collection)
    .then(
      () => this.interaction.showSuccess("Usuario eliminado con éxito", "Usuario eliminado")
    )
    .catch( (error) => this.interaction.showSuccess("Hubo un error", "Error")
    )
  }

  Activar(usuario: Usuario){
console.log(usuario);
  if(usuario.activo==true){
    this.interaction.showWarning("Usuario seleccionado ya está activo", "");
  }else{
    usuario.activo=true;
    console.log(usuario);
    this.firebase.Update(usuario.uid, usuario).then(
      ()=> this.interaction.showInfo("Se realizó activación de usuario", "Activacion Usuario")
      )
    }
  }

  ToRegister(){
    this.router.navigate(['registro']);
  }
}
