import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/Entities/especialidad';
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
  termino! : string;

  constructor(private firebaseService : FirebaseService) { }

  ngOnInit(): void {
  }
  SeleccionEsp(p: string){

    this.espSeleccionado.emit(p);
  }

  
  Buscar( busqueda :any){
    this.termino = busqueda;
    
    this.firebaseService.GetDocsByFilter<Usuario>("Usuarios", "especialidad", this.termino)
    .subscribe(
      (res)=>{
        console.log(busqueda);
        console.log(res);
        
        this.especialistas = [];

        res.forEach((element: any) =>{
          this.especialistas?.push({
            id : element.payload.doc.id,
            ...element.payload.doc.data()
          }
            )
        });
        console.log(this.especialistas);
        // this.especialistas.forEach(
        //   (x)=> {
        //     this.firebaseService.GetDocFromFirebase<Especialidad>(x.uid,"Especialidades")
        //     .subscribe((res)=> {
        //       x.especialidad = res?.nombre!;
        //     })
        //   })
      }
    )
  }
}
