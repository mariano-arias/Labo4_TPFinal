import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Entities/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @Input() usuario: Usuario | undefined;
  @Input() usuarioPhoto: string | undefined;
 
  constructor() { }

  ngOnInit(): void {
  }
  
  GetUser(e : any){
    this.usuario = e;
  }

  GetUserPhoto(e : any){
    this.usuarioPhoto = e;
  }
  


}
