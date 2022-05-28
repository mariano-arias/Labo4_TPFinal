import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private authentication: AngularFireAuth) { }

  async Register( mail: string, pass:string){

    return await this.authentication.createUserWithEmailAndPassword(mail, pass);
  }

  async Login( mail: string, pass:string){

    return await this.authentication.signInWithEmailAndPassword(mail, pass);
  }
}
