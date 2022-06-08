import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entities/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    email: '',
    password: ''
  }

  loginError : boolean | undefined;

  loginErrorUser : boolean | undefined;

  loginErrorPass : boolean | undefined;

  loginErrorValidationMail: boolean | undefined;

  perfil : string | undefined;

  usuarios : Usuario [] = [];
  
  collection: string = "Usuarios";

  imagenes!: string;

  constructor(
              private router: Router,
              private authService: AuthService, 
              private firebaseService : FirebaseService,
              private storageService : StorageService,
              private interactionService: InteractionService ) { }

  ngOnInit(): void 
  {
    this.firebaseService.GetDocs<Usuario>('Usuarios').subscribe(
      (res)=> {
        this.usuarios = res;
        // this.usuarios.forEach(
        //   (u)=> 
        //   {
        //    u.photoPerfilURL = this.storageService.GetFile(u.imagen1Name);
        //   }
        // )
      }
    );
    this.usuarios = this.usuarios.slice(0,5);
    }


  async Ingresar(){

    this.interactionService.showSpinner();

    this.loginError = false;
    this.loginErrorUser = false;
    this.loginErrorPass = false;
    this.loginErrorValidationMail = false;

    const res =  this.authService.Login(this.usuario.email, this.usuario.password)
                .then( (r)=>
                {
                  if(r.user)
                  {
                    if(r.user.emailVerified)
                    {

                      this.interactionService.showSuccess("Login exitoso", "Login OK")
                      this.router.navigate(['home']);

                    }
                    else
                    {
                      this.interactionService.showWarning("Pendiente verificacion email. Revise su bandeja de entrada", "Pendiente verificacion correo");
                      //this.authService.sendEmail(r.user);
                      this.authService.Logout();
                      this.loginErrorValidationMail = true;
                      throw Error;
                    }
                  }
                })
                .catch( (error) => 
                {
                  var errorCode = error.code;

                  if (errorCode === 'auth/user-not-found')
                  {
                    this.loginErrorUser = true;
                  }
                  else if (errorCode === 'auth/wrong-password') 
                  {
                    this.loginErrorPass = true;
                  }
                  else
                  {
                    this.loginError = true;
                  }
                });
    //this.router.navigate(['home']);

  }
  
  ToRegister(){
    this.router.navigate(['registro']);
  }

  Login(p : Usuario){
    this.usuario.email = p.email;
    this.usuario.password ="123123"
    this.Ingresar();
  }




}
