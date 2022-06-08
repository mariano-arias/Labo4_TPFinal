import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-registro-perfil',
  templateUrl: './registro-perfil.component.html',
  styleUrls: ['./registro-perfil.component.css']
})
export class RegistroPerfilComponent implements OnInit {

  @Output() emitPerfilRegister : EventEmitter<any> = new EventEmitter<any>();

  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {

  }

  Click(p : string){
    console.log(p);
    
    this.emitPerfilRegister.emit(p);
  }

}
