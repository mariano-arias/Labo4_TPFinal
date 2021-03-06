import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { StorageService } from 'src/app/services/storage.service';
import { DownloadFileComponent } from 'src/app/Utils/download-file/download-file.component';

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
  userPhoto! : string | undefined;
  
  // @Output() photoUrl : EventEmitter<any> = new EventEmitter<any>();
  @Output() usuarioAEditar: EventEmitter<any> = new EventEmitter<any>();
  @Output() usuarioAEditarPhoto: EventEmitter<any> = new EventEmitter<any>();

  constructor(  private firebase: FirebaseService, private router : Router,
                private interaction : InteractionService,
                private storageService : StorageService,
                private download : DownloadFileComponent
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

  VerHistoriaClinica(p: Usuario){
    

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
    this.storageService.GetFile(usuario.imagen1Name).then(
      (res)=> {
        this.userPhoto = res;
        this.usuarioAEditarPhoto.emit(this.userPhoto)
      }
      )
   // this.aux = this.storageService.GetFile(usuario.imagen1Name);

  }

  Eliminar(usuario : Usuario){
    this.interaction.showSpinner();
    this.firebase.DeleteById(usuario.uid, this.collection)
    .then(
      () => this.interaction.showSuccess("Usuario eliminado con ??xito", "Usuario eliminado")
    )
    .catch( (error) => this.interaction.showSuccess("Hubo un error", "Error")
    )
  }

  Activar(usuario: Usuario){

  if(usuario.activo==true){
    this.interaction.showWarning("Usuario seleccionado ya est?? activo", "");
  }else{
    usuario.activo=true;

    this.firebase.Update(usuario.uid, usuario).then(
      ()=> this.interaction.showInfo("Se realiz?? activaci??n de usuario", "Activacion Usuario")
      )
    }
  }

  ToRegister(){
    this.router.navigate(['registro']);
  }

  ToExport(){
    this.download.DataToCVS(this.usuarios, this.perfil);
  }

}
