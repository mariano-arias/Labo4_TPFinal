import { Injectable } from '@angular/core';
import {  } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { environment } from '../../environments/environment.prod';
import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { runInThisContext } from 'vm';
import { Observable } from 'rxjs';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

 // storageRef = firebase.storage().ref();

  
 //store = getStorage();
 //storageRef = ref(this.store, 'Usuarios');

 res! : string;
 path! : string;
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
      this.res = snapshot.metadata.fullPath;
      return this.res;
    });
    return this.res;
    //  const aux = await this.storageRef.uploadBytes (imgBase64, "data_url")
    //             .catch( (err)=> {
    //               console.log(err);
    //             });
    // return await aux.ref.getDownloadURL();
  }

  GetFile(nameFile : string | undefined) {

    const store = getStorage();
    const storageRef = ref(store, 'Usuarios/'+nameFile);
    

    getDownloadURL(storageRef).then( (url)=>{
      console.log(url);
      this.path = url;

    }).catch(
      ()=>{
        console.log("Error n getfile");
        
      }
      )
      return this.path;
      

  }

}
