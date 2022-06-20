import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/Entities/especialidad';
import { Turno } from 'src/app/Entities/turno';
import { Usuario } from 'src/app/Entities/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  collectionTurnos : string = 'Turnos';
  collectionUsuarios : string = 'Usuarios';
  turno : Turno  = new Turno;
  perfilPaciente : string = "paciente";
  perfilEspecialista : string = "especialista";
  usuarioLogueado : Usuario | undefined;
  especialista : Usuario | undefined;
  pacientes : Usuario[] =[];
  pacienteTurno : Usuario | undefined;
  especialidades:Especialidad[] | undefined;
  
  constructor(private authService:AuthService, private firebaseService : FirebaseService,
    private interactionService : InteractionService, private router : Router,
    private modalService: ModalService) { }

  ngOnInit(): void {
    
  }

  VerHistoria(p:Usuario){

  }
}
