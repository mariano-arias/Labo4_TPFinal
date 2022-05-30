import { Injectable } from '@angular/core';
import {  } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { environment } from '../../environments/environment.prod';
import { getApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";
import { runInThisContext } from 'vm';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

 // storageRef = firebase.storage().ref();

  
 //store = getStorage();
 //storageRef = ref(this.store, 'Usuarios');

 res! : string;
  constructor() { }

  // 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });

  async FileUpload(nameFile: string, imgFile : any){

     
 const store = getStorage();
 const storageRef = ref(store, 'Usuarios/'+nameFile);


    uploadString(storageRef, imgFile, 'data_url').then((snapshot) => {
      console.log('Uploaded a base64 string!');
      this.res = snapshot.metadata.fullPath
    });
    //  const aux = await this.storageRef.uploadBytes (imgBase64, "data_url")
    //             .catch( (err)=> {
    //               console.log(err);
    //             });
return this.res;
    // return await aux.ref.getDownloadURL();
  }

}
