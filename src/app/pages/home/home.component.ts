import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  spinner: boolean = true;

  constructor( ) { }

  ngOnInit(): void {
   
  }

  public showSpinner(): void {
    console.log("metodo");
    

    // setTimeout(() => {
    //   this.spinnerService.hide();
    // }, 5000); // 5 seconds
  }

  HideSpinner(){
    this.spinner= false;
  }
}
