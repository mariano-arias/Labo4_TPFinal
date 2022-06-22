import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/Entities/especialidad';
import { HistoriaClinica } from 'src/app/Entities/historiaClinica';
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
  turnos:Turno[] = [];
  turnosEfectivos:Turno[] = [];
  perfilPaciente : string = "paciente";
  perfilEspecialista : string = "especialista";
  usuarioLogueado! : Usuario;
  especialista : Usuario | undefined;
  pacienteTurno : Usuario | undefined;
  especialidades:Especialidad[] | undefined;
  usuario! : Usuario;
  pacientes : Usuario[] =[];
  misPacientes : Usuario[] =[];
  historias : HistoriaClinica[]=[];
  
  resenia!: string;


  constructor(private authService:AuthService, private firebaseService : FirebaseService,
    private interactionService : InteractionService, private router : Router,
    private modalService: ModalService) { }

    @ViewChild('modal', { read: ViewContainerRef })
    entry!: ViewContainerRef;
    sub!: Subscription;
    
  ngOnInit(): void {
    this.authService.GetUserLogged().subscribe(
      (res)=>
      {
      //  console.log(res?.uid);
        
         if(res?.uid){
        //   this.usuarioLogueado.uid = res.uid;

          this.firebaseService.GetDocFromFirebase<Usuario>(res?.uid, this.collectionUsuarios)
          .subscribe((res)=>
          {
            this.usuario = res!;
          //  console.log(this.usuario);
            if(this.usuario?.perfil == 'especialista'){
        this.firebaseService.GetDocsByFilter<Turno>(this.collectionTurnos, 'especialistaId', this.usuario.uid)
        .subscribe(
        (res)=>
        {
        this.turnos = [];
        res.forEach((element: any) =>{
          this.turnos?.push(
            {
            id : element.payload.doc.id,
            ...element.payload.doc.data()
            })
          });
          
          this.turnosEfectivos=this.turnos.filter(t => t.estado=='realizado');

          console.log("turnos efectivos",this.turnosEfectivos);

          this.firebaseService.GetDocsByFilter<Usuario>(this.collectionUsuarios, 'perfil', 'paciente')
          .subscribe(
            (res)=>{
              this.pacientes = [];
              res.forEach((element: any) =>{
                this.pacientes?.push(
                  {
                  id : element.payload.doc.id,
                  ...element.payload.doc.data()
                  })
                });
                console.log('pacientes',this.pacientes);
this.misPacientes=[];
                this.pacientes.forEach(
                  (x)=>{
                    this.turnosEfectivos.forEach(
                      (t)=>{
                        if(t.pacienteId==x.uid){
                          if(!this.misPacientes.includes(x))
                            this.misPacientes.push(x);
                        }
                      }
                    )
                  }
                )
                console.log('mis pacientes',this.misPacientes);
            }
            )
        }
        )
       }

          })
        }
      })
}


  VerHistoria(p:Usuario){

  }
  titulo!: string;

  openModal(t :string) {
   // if(t.estado=='realizado'){
     this.titulo = 'Reseña'
     this.sub = this.modalService
     .openModal(this.entry, this.titulo,t)
     .subscribe((v) => {
       //
      });
  
  }
  
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  VerResenia(t:Turno){
  //   console.log(t);
    
  //   this.resenia = "";
  //   this.firebaseService.GetDocsByFilter("Historias", "turnoId", t.id)
  //   .subscribe(
  //     (res)=>{
  //       this.historias = [];
  //       res.forEach((element: any) =>{
  //         this.historias?.push({
  //           id : element.payload.doc.id,
  //           ...element.payload.doc.data()
  //         }
  //           )
  //       });
  //       console.log(this.historias);
        
  //     }
  //   )
  //   this.historias.forEach(
  //     x=>this.resenia = x.texto
  //   )
  //   console.log(this.resenia);
    
  //   this.openModal(this.resenia);
   }
}
