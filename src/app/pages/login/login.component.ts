import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(
              private router: Router,
              private authService: AuthService, 
              private firebaseService : FirebaseService,
              private interactionService: InteractionService ) { }

  ngOnInit(): void {
  }

  async Ingresar(){

    this.interactionService.showSpinner();

    this.loginError = false;
    this.loginErrorUser = false;
    this.loginErrorPass = false;
    this.loginErrorValidationMail = false;

    console.log(this.usuario);

    const res =  this.authService.Login(this.usuario.email, this.usuario.password)
                .then( (r)=>
                {
                  if(r.user)
                  {
                    console.log(r.user);
                    
                    if(r.user.emailVerified)
                    {
                        this.interactionService.showSuccess("Login exitoso", "Login OK")
                        this.router.navigate(['home']);
                    
                      // this.firebaseService.GetDocFromFirebase<Usuario>(r.user.uid, 'Usuarios')
                      // .subscribe((res)=> 
                      // {
                        // if(res?.perfil == 'paciente')
                        // {
                        // }
                        // if(res?.perfil == 'especialista')
                        // {
                        //   if(res?.activo)
                        //   {
                        //     this.interactionService.showSuccess("Login exitoso", "Login OK")
                        //     this.router.navigate(['home']);
                        //   }
                          // else
                          // {
                          //   this.interactionService.showWarning("Cuenta pendiente de activacion por administrador.", "Pendiente aprobacion");
                          //   this.authService.Logout();

                          // }
                        
                    
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
    // console.log();
  }
  
  ToRegister(){
    this.router.navigate(['registro']);
  }
}
