import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  flagSearch: boolean = false;
  termino! : string;
  usuarios: Usuario[]= [];

  @Output() especialistaElegido : EventEmitter<any> = new EventEmitter<any>();

  constructor(private firebaseService : FirebaseService) { }

  ngOnInit(): void {
  }

  Buscar(){
    console.log(this.termino);
    this.flagSearch==true;
    this.firebaseService.GetDocsByFilter<Usuario>("Usuarios", "especialidad", this.termino)
    .subscribe(
      (res)=>{
        this.usuarios = [];
        console.log(res);
        
        res.forEach((element: any) =>{
          this.usuarios?.push({
            id : element.payload.doc.id,
            ...element.payload.doc.data()
          }
            )
        });
      }
    )
  }
  SeleccionEsp(p : string){
    this.especialistaElegido.emit(p);
  }
}
