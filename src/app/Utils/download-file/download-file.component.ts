import { Component, Injectable, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Usuario } from 'src/app/Entities/usuario';

// @Component({
//   selector: 'app-download-file',
//   templateUrl: './download-file.component.html',
//   styleUrls: ['./download-file.component.css']
// })

@Injectable({
  providedIn: 'root'
})
export class DownloadFileComponent implements OnInit {

  filename: string = "Reporte";
  userExcelList: Usuario[] = [];
  usuario : Usuario = new Usuario;

  constructor() { }
  ngOnInit(): void {
  }

  DataToCVS(data: Usuario[], perfil: string){

    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false, 
      showTitle: false,
      title: 'Reporte de '+perfil,
      useBom: false,
      noDownload: false,
      headers: ["Id", "Nombre", "Apellido"]
    };

for(let i=0; i<data.length; i++){

  this.usuario = new Usuario;
  this.usuario.uid=data[i].uid;
  this.usuario.apellido=data[i].apellido;
  this.usuario.nombre=data[i].nombre;

  this.userExcelList.push(this.usuario);


  // let user = new Usuario{
    
  // }
  // if(p == 'id') this.userExcelList[p] = data[p];
  // if(p == 'nombre') this.userExcelList[p] = data[p];
  // if(p == 'apellido') this.userExcelList[p] = data[p];
  }

  new ngxCsv(this.userExcelList,this.filename, options);
}
}
