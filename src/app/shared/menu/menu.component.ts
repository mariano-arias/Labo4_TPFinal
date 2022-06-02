import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { InteractionService } from '../../services/interaction.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Usuario } from 'src/app/Entities/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogged : any | null = null;

  collection : string = 'Usuarios';

  perfilUserLogged!: string | undefined;

  usuario! : Usuario | undefined;

  constructor(private authService : AuthService, private router: Router, 
              private interacionService : InteractionService, private firebaseService : FirebaseService) { 
      this.authService.GetUserLogged().subscribe( (res)=>{
      if(res?.uid){
        //console.log("usuer logged: ", res);
        console.log("user logged: ", res.email);
        this.userLogged = res.email;
        this.GetDataUser(res.uid);
      }
      else{
        console.log("no user logged");
        
      }
    });
  }

  ngOnInit(): void {
  }

  Salir(){
    this.authService.Logout().then(
      () =>  this.interacionService.showError("Logout exitoso", "Logout")
    );
    this.router.navigate(['login']);

  }

  GetDataUser (user : any){
    
     this.firebaseService.GetDocFromFirebase<Usuario>(user, this.collection)
      .subscribe((res)=> this.perfilUserLogged = res?.perfil)
  }
}
