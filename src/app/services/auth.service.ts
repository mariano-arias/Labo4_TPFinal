import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../Entities/usuario';

import { getAuth, sendEmailVerification } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authentication: AngularFireAuth) { }

  async Login(email : string, password: string){

    return this.authentication.signInWithEmailAndPassword(email, password);
    //.then((c)=> console.log(c));

  }

  Logout(){
    return this.authentication.signOut();
  }

  async Register( newUser : Usuario){
    return this.authentication.createUserWithEmailAndPassword(newUser.email, newUser.password);

  }

  async sendEmail(user: any){
    sendEmailVerification(user).then(
      ()=> console.log("email enviado")
    ).catch( ()=> console.log("error con envio de email")
    );
  }


  GetUserLogged(){
    return this.authentication.authState;
  }
}
