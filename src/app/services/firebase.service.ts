import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../Entities/usuario';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase : AngularFirestore) { }

  async createUsuario(user : Usuario){

    this.firebase.collection('Usuarios', ).doc(user.uid).set(user);
  }


}
