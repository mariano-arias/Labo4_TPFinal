import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: ['./search-result-table.component.css']
})
export class SearchResultTableComponent implements OnInit {

  @Output() usuarioSeleccionado : EventEmitter<any> =  new EventEmitter<any>();
  listaUsuarios: Usuario[]= [];
  termino! : string;

  especialidad : string = "Especialidad";
  obraSocial: string = "Obra Social";
  usuariosCollection = "Usuarios";
  pacientePerfil = "paciente";
  especialistaPerfil = "especialista";

  @Input() perfil: string ="";

  constructor(private firebaseService : FirebaseService) { }

  ngOnInit(): void {
  }

  Buscar( busqueda :any){
    console.log(busqueda);
    this.termino = busqueda;
   if(this.perfil == 'especialista')
   {
      this.firebaseService.GetDocsByFilter<Usuario>(this.usuariosCollection, "especialidad", this.termino)
      .subscribe
      (
        (res)=>
        {
          this.listaUsuarios = [];
          res.forEach((element: any) =>
          {
            this.listaUsuarios?.push({
              id : element.payload.doc.id,
              ...element.payload.doc.data()
            })
          });
          this.listaUsuarios= this.listaUsuarios.filter(x=>x.activo==true);
        }
      )
    }
    else
    {
      console.log("entro",busqueda);
      this.firebaseService.GetDocsByFilter<Usuario>(this.usuariosCollection, "apellido", this.termino)
      .subscribe
      (
        (res)=>
        {
          this.listaUsuarios = [];
          res.forEach((element: any) =>
          {
            this.listaUsuarios?.push({
              id : element.payload.doc.id,
              ...element.payload.doc.data()
            })
          });
        }
      )
    }
  }
  
  
  SeleccionEsp(p: string)
  {
    this.usuarioSeleccionado.emit(p);
  }

}
