import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Entities/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario | undefined;
  collection : string = "Usuarios";

  constructor(private authService : AuthService, private firebaseService :FirebaseService) {
    this.authService.GetUserLogged().subscribe( (res)=>{
      if(res?.uid){
        //console.log("usuer logged: ", res);
        this.firebaseService.GetDocFromFirebase<Usuario>(res.uid, this.collection)
        .subscribe((res)=> {
          console.log('Perfil component',res);
          this.usuario = res;
        })
      }
      else{
        console.log("no user logged");
      }
    });
   }

  ngOnInit(): void {
  }

}
