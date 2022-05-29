import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogged : any | null = null;

  constructor(private authService : AuthService, private router: Router, private interacionService : InteractionService) { 
      this.authService.GetUserLogged().subscribe( (res)=>{
      if(res?.uid){
        console.log("usuer logged: ", res.uid);
        console.log("usuer logged: ", res.displayName);
        
        console.log("usuer logged: ", res.email);
        this.userLogged = res.email;
        console.log(this.userLogged);
      }
      else{
        console.log("nadie");
        
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
}
