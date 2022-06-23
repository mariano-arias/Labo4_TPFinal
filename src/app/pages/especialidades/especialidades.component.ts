import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/Entities/especialidad';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {

  lista: Especialidad[] = [];
  filesAdjuntos: any;
  
  imgFile1: any = null;
  upload: boolean = false;


  constructor(private firebaseService : FirebaseService,
              private interactionService: InteractionService,
              private storageService : StorageService) { }

  ngOnInit(): void {
    this.firebaseService.GetDocs<Especialidad>("Especialidades")
    .subscribe(
      (res)=>{
        this.lista=res;
       // console.log(this.lista);
        this.lista.forEach(
          (x)=>{
            this.storageService.GetFileEsp(x.nombre)
            .then((url)=>{
              if(url)
                x.imageURL=url;
              url='';
            })
            .catch()
            .finally(
             
            )
          }
        )
        console.log(this.lista);
        
      }
    )
  }

  Guardar(p: Especialidad){
    console.log(p);
    this.storageService.FileUploadEsp(p.nombre, this.imgFile1)
    .then(
      ()=>this.interactionService.showSuccess("Actualizacion exitosa", "ok")
    ).catch(
      ()=> this.interactionService.showError("Se ha producido un error", "Error")
    )
  }

  uploadFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      //console.log(event.target.files);
      if (event.target.files.length > 1) {
        this.interactionService.showWarning(
          'Solo puede cargar una imagen',
          'Error'
        );
        event.target.files = null;
        return;
      }

      this.filesAdjuntos = event.target.files;

      let reader = new FileReader();

      reader.readAsDataURL(this.filesAdjuntos[0]);
      reader.onloadend = () => {

        this.imgFile1 = reader.result;
      };
    }
  }

  CambiarFoto(){
    this.upload = true;
  }
  Cancelar(){
    this.upload=false;
  }
}
