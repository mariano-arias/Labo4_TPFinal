import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../Entities/usuario';

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
    this.authentication.signOut();
  }

  async Register( newUser : Usuario){
    return this.authentication.createUserWithEmailAndPassword(newUser.email, newUser.password);

  }
}
