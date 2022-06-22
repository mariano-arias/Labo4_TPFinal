import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { InteractionService } from '../../services/interaction.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Usuario } from 'src/app/Entities/usuario';
import { slideInAnimation } from 'src/app/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [slideInAnimation]
})
export class MenuComponent implements OnInit {

  userLogged : any | null = null;
  userLoggedName!: string;

  collection : string = 'Usuarios';

  perfilUserLogged!: string | undefined;

  usuario! : Usuario | undefined;

  constructor(private authService : AuthService, private router: Router, 
              private interacionService : InteractionService, private firebaseService : FirebaseService) { 
      this.authService.GetUserLogged().subscribe( (res)=>{
      if(res?.uid){
        //console.log("usuer logged: ", res);
        this.userLogged = res.email;
        this.GetDataUser(res.uid);
        if(!this.usuario?.activo && this.usuario?.perfil=="especialista"){
          this.SalirCuentaNoActiva();
        }
      }
      else{
        console.log("no user logged");
      }
    });
  }

  ngOnInit(): void {
  }

  SalirCuentaNoActiva(){
    this.authService.Logout().then(
      () =>  this.interacionService.showError("Su cuenta debe ser activadada por un administrador", "Logout")
    );
    this.router.navigate(['login']);
  }
  Salir(){
    this.authService.Logout().then(
      () =>  this.interacionService.showError("Logout exitoso", "Logout")
    );
    this.router.navigate(['login']);
  }


  GetDataUser (user : any){
    
     this.firebaseService.GetDocFromFirebase<Usuario>(user, this.collection)
      .subscribe((res)=> {
        this.perfilUserLogged = res?.perfil;
        this.usuario = res;
      })
  }
}
