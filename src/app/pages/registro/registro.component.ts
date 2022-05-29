import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../Entities/usuario';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // usuario : Usuario = {
  //   uid: '',
  //   nombre: 'Mariano',
  //   apellido: 'Luis',
  //   edad: 43,
  //   dni: 22334455,
  //   obraSocial: 'Osecac',
  //   email: 'mariano@utn.com',
  //   password: '123456',
  //   perfil: 'paciente'
  // }

  
  public userForm : FormGroup;

  usuario : Usuario = new Usuario();
  
  loginError : boolean | undefined;

  loginErrorUser : boolean | undefined;

  loginErrorPass : boolean | undefined;

  createUserError : string | null = null;

  constructor(private authService: AuthService, private router: Router,
              private firestore: FirebaseService, public formBuilder: FormBuilder, 
              private validatorService: ValidatorService) 
              {
                this.userForm = this.formBuilder.group(
                  {
                    nombre: ['', [Validators.required, Validators.minLength(3)]],
                    apellido: ['', [Validators.required, Validators.minLength(3)]],
                    edad: ['', [Validators.required, Validators.min(18),Validators.max(125)]],
                    dni: ['', [Validators.required, Validators.minLength(7)]],
                    obraSocial: ['', [Validators.required, Validators.minLength(4)]],
                    email: ['',[Validators.required, Validators.email]],
                    password: ['', [Validators.required, Validators.minLength(6)]],
                    password2: ['', [Validators.required, Validators.minLength(6)]]
                  },
                  {
                    validators: [ this.validatorService.checkPassword('password', 'password2')]
                  }
                )
               }

  ngOnInit(): void {
  }

  async Registrar(){

    this.loginError = false;
    this.loginErrorUser = false;
    this.loginErrorPass = false;

    this.createUserError = null;

    this.usuario = this.userForm.value;
    
    console.log(this.usuario);

    const res = await this.authService.Register(this.usuario)
                .then( (res)=>{
                  console.log( res.user?.uid);
                  if(res.user){
                    const id = res.user.uid;
                    this.usuario.uid = res.user.uid;
                    this.usuario.password='';
                    this.firestore.createUsuario(this.usuario).then
                    ( (res) => {
                      this.authService.Login(this.usuario.email, this.usuario.password).then
                      ((res) => {
                        if(res.user){
                         console.log("user creado y logueado");
                         
                        }
                      }).catch(
                        (error) => {
                  
                          var errorCode = error.code;
        
                          if (errorCode === 'auth/user-not-found'){
                            this.loginErrorUser = true;
                          }
                          else if (errorCode === 'auth/wrong-password') {
                            this.loginErrorPass = true;
                          }
                          else{
                            this.loginError = true;
                          }
                        }
                      )
                    })
                  }
                  this.router.navigate(['home']);
                })
                .catch( (error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;

                  console.log(errorCode);
                  console.log(errorMessage);

                  console.log(error);
                  
                  if (errorCode == 'auth/email-already-in-use') {
                    this.createUserError = "Correo electronico ya está en uso";
                  //   console.log("auth/email-already-in-use");
                  // }
                  // } else {
                  }else{
                    this.createUserError= errorCode;
                  }
                });
  }
}
