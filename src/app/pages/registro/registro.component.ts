import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../Entities/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : Usuario = {
    uid: '',
    nombre: 'Mariano',
    apellido: 'Arias',
    edad: 43,
    dni: 12312332,
    obraSocial: 'Osecac',
    email: 'algo@utn.com',
    password: '123456',
    perfil: 'paciente'
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async Registrar(){
    console.log(this.usuario);

    const res = await this.authService.Register(this.usuario)
                .then( (res)=>{
                  console.log( res.user?.uid);
                  if(res.user){
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
