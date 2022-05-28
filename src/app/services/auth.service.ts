import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authentication: AngularFireAuth) { }

  async Login(email : string, password: string){

    return this.authentication.signInWithEmailAndPassword(email, password);
    //.then((c)=> console.log(c));
    

  }
}
