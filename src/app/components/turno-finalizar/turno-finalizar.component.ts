import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOADIPHLPAPI } from 'dns';
import { HistoriaClinica } from 'src/app/Entities/historia';
import { Turno } from 'src/app/Entities/turno';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-turno-finalizar',
  templateUrl: './turno-finalizar.component.html',
  styleUrls: ['./turno-finalizar.component.css']
})
export class TurnoFinalizarComponent implements OnInit {

  @Input() profesional: Usuario | undefined;
  @Input() paciente: Usuario | undefined;
  @Input() turno: Turno | undefined;

  public turnoForm!: FormGroup;
  historia!: HistoriaClinica;

  historiaClinicaCollection = "Historias";
  turnosCollection = "Turnos";

  constructor(  private firebaseService : FirebaseService,
                private interactionService : InteractionService, 
                private router : Router,
                public formBuilder: FormBuilder
              ) { }

  ngOnInit(): void {
    console.log(this.turno);
    
    this.turnoForm = this.formBuilder.group(
      {
        comentario: ['', [Validators.required]],
        altura: ['', [Validators.required]],
        peso: ['', [Validators.required]],
        temperatura: ['', [Validators.required]],
        presion: ['', [Validators.required]],
      }
    )
  }

  Registrar(){
    this.historia = this.turnoForm.value;
    this.historia.turnoId = this.turno?.id!;
    this.firebaseService.CreateDoc<HistoriaClinica>(this.historiaClinicaCollection, this.historia)
    .then(()=>{
      this.interactionService.showSuccess("Se ha registrado los datos correpondientes a la atencion del turno", "Datos guardados");
      this.firebaseService.UpdateDoc<Turno>(this.turnosCollection, this.turno?.id!, this.turno )
      this.router.navigate(['home']);
      }
      )
    .catch((err)=>console.log(err))
    ;
  }

  Cancelar(){
    this.router.navigate(['home']);
  }
}
