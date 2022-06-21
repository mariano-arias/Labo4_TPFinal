import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOADIPHLPAPI } from 'dns';
import { DatosDinamicos, HistoriaClinica } from 'src/app/Entities/historiaClinica';
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

datosAdicionales : DatosDinamicos []=[];
adicional = {
  clave:"",
  valor: 0
}
adicionalesCounter : number = 0;


  constructor(  private firebaseService : FirebaseService,
                private interactionService : InteractionService, 
                private router : Router,
                public formBuilder: FormBuilder
              ) { }

 GetTurno(t : Turno){
this.turno=t;
 }

  ngOnInit(): void {

    this.turnoForm = this.formBuilder.group(
      {
        texto: ['', [Validators.required]],
        altura: ['', [Validators.required, Validators.min(0), Validators.max(300)]],
        peso: ['', [Validators.required, Validators.min(0), Validators.max(500)]],
        temperatura: ['', [Validators.required,  Validators.min(0), Validators.max(50)]],
        presion: ['', [Validators.required]],
      //  adicional: [''],
      }
    )
  }

  Registrar(){

    this.historia = this.turnoForm.value;
    this.historia.turnoId = this.turno?.id!;
    this.historia.profesionalId = this.turno?.especialistaId!;
    this.historia.pacienteId = this.turno?.pacienteId!;
    this.historia.datosAdicionales=this.datosAdicionales;
    this.historia.fecha=this.turno?.fecha!;
    this.historia.especialidad=this.turno?.especialidadNombre!;

    this.firebaseService.UpdateDoc<Turno>(this.turnosCollection, this.turno?.id!, this.turno );
    this.firebaseService.CreateDoc<HistoriaClinica>(this.historiaClinicaCollection, this.historia)
    .then(
      ()=>{
      this.interactionService.showSuccess("Se ha registrado los datos correpondientes a la atencion del turno", "Datos guardados");
      //this.firebaseService.UpdateDoc<Turno>(this.turnosCollection, this.turno?.id!, this.turno )
      this.router.navigate(['home']);
      }
      )
    .catch((err)=>console.log(err))
  }
  
  SumarInfoAdicional(){

    this.adicionalesCounter++;
    this.datosAdicionales.push(
      {
        clave:this.adicional.clave, 
        valor: this.adicional.valor
      });
    this.adicional.clave="";
    this.adicional.valor=0;

  }
  Cancelar(){
    this.router.navigate(['home']);
  }
}
