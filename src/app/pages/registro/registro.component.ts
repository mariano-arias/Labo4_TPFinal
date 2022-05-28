import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../Entities/usuario';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : Usuario = {
    uid: '',
    nombre: 'Mariano',
    apellido: 'Luis',
    edad: 43,
    dni: 22334455,
    obraSocial: 'Osecac',
    email: 'mariano@utn.com',
    password: '123456',
    perfil: 'paciente'
  }

  constructor(private authService: AuthService, private router: Router,
              private firestore: FirebaseService) { }

  ngOnInit(): void {
  }

  async Registrar(){
    console.log(this.usuario);

    const res = await this.authService.Register(this.usuario)
                .then( (res)=>{
                  console.log( res.user?.uid);
                  if(res.user){
                    const id = res.user.uid;
                    this.usuario.uid = res.user.uid;
                    this.usuario.password='';
                    this.firestore.createUsuario(this.usuario);
                    this.router.navigate(['home']);
                  }
                })
                .catch( (error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;

                  console.log(errorCode);
                  console.log(errorMessage);

                  console.log(error);
                  // if (errorCode == 'auth/weak-password') {

                  // } else {
                  // }
      
    });
  }
}
