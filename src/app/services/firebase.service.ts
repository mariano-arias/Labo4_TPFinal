import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Turno } from '../Entities/turno';
import { Usuario } from '../Entities/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase : AngularFirestore) { }

  async createUsuario(user : Usuario){

    this.firebase.collection('Usuarios', ).doc(user.uid).set(user);
  }

  GetDocs<tipo>(collection : string){
    return this.firebase.collection<tipo>(collection).valueChanges();
  }
  GetDocsBy(collection : string, filtro : string){
    return this.firebase.collection(collection, ref => ref.where('perfil', '==', filtro)).snapshotChanges();
  }

  GetDocsByFilter<tipo>(collection : string, filtroClave : string, filtroValor: string){
    return this.firebase.collection<tipo>(collection, ref => ref.where(filtroClave, '==', filtroValor)).snapshotChanges();
  }

  GetDocFromFirebase<tipo>(id : any, collection : string){

    return this.firebase.collection(collection).doc<tipo>(id).valueChanges();
    //.subscribe( (c)=> console.log(c))
  }

  DeleteById(id: string, collection: string){
    return this.firebase.collection(collection).doc(id).delete();
  }
    
    GetPerfil<Usuario>(id : any){

      return this.firebase.collection('Usuarios').get(id).subscribe(
        (x)=>console.log(x)
         
      )
  }
  Update<tipo>(id: string, data: any){
    return this.firebase.collection<tipo>("Usuarios").doc(id).update(data);
  }

  async CreateDoc<Turno>(collection : string, data : any){
    return this.firebase.collection<Turno>(collection)
    .doc().set({...data});
}
}
