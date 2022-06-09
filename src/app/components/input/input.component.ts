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

  @Output() onEnterTermino : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  Buscar(){
    console.log(this.termino);
    
    this.onEnterTermino.emit(this.termino);
  }
}
