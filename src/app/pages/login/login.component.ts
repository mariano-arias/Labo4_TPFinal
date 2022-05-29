import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router,
              private interactionService: InteractionService ) { }

  ngOnInit(): void {
  }

  async Ingresar(){

    this.loginError = false;
    this.loginErrorUser = false;
    this.loginErrorPass = false;

    console.log(this.usuario);

    const res = await this.authService.Login(this.usuario.email, this.usuario.password)
                .then( (r)=>{
                  if(r.user){
                    this.interactionService.showSuccess("Login exitoso", "Login OK")
                    this.router.navigate(['home']);
                  }
                })
                .catch( (error) => {
                  
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
                });
    //this.router.navigate(['home']);
    // console.log();

  }
  ToRegister(){
    this.router.navigate(['registro']);
  }
}
