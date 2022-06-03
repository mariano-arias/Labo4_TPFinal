import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entities/usuario';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() usuario : Usuario | undefined;
  

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  
}
