import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-especialista-search',
  templateUrl: './especialista-search.component.html',
  styleUrls: ['./especialista-search.component.css']
})
export class EspecialistaSearchComponent implements OnInit {

  @Output() espSeleccionado : EventEmitter<any> =  new EventEmitter<any>();
  especialistas: Usuario[]= [];
  
  flagSearch: boolean = false;
  termino! : string;

  constructor(private firebaseService : FirebaseService) { }

  ngOnInit(): void {
  }
  SeleccionEsp(p: string){

    this.espSeleccionado.emit(p);
  }

  
  Buscar( busqueda :any){
    this.termino = busqueda;
    this.flagSearch==true;
    this.firebaseService.GetDocsByFilter<Usuario>("Usuarios", "especialidad", this.termino)
    .subscribe(
      (res)=>{
        this.especialistas = [];
        console.log(res);
        
        res.forEach((element: any) =>{
          this.especialistas?.push({
            id : element.payload.doc.id,
            ...element.payload.doc.data()
          }
            )
        });
      }
    )
  }
}
