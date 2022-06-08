import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entities/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styles: [
  ]
})
export class TurnosComponent implements OnInit {

  usuario! : string;

  constructor(private authService:AuthService, private firebaseService : FirebaseService,
    private interactionService : InteractionService, private router : Router) 
    { 
      this.authService.GetUserLogged().subscribe( (res)=>{
      if(res?.uid){
      this.usuario = res.uid;
      
}
else{
console.log("no user logged");
}

})

}

  ngOnInit(): void {
  }

}
