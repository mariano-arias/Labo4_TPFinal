import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HistoriaClinica } from 'src/app/Entities/historiaClinica';
import { Turno } from 'src/app/Entities/turno';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { StorageService } from 'src/app/services/storage.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {
  @ViewChild('data') htmlData!: ElementRef;
  @Input() usuario : Usuario | undefined;
  @Input() userPhoto : string | undefined;
  turnos: Turno [] = [];
  historial: HistoriaClinica[] = [];
  flagPDF:boolean = true;

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
             console.log(this.historial);
             
             }
           )
  }

  openPDF(){
    this.flagPDF=true;
    let DATA: any = document.getElementById('data');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 200;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL( 'image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 5;
      PDF.addImage(FILEURI, 'PNG', 5, position, fileWidth, fileHeight);
      PDF.save('download.pdf');
    });
    this.flagPDF=false;
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
