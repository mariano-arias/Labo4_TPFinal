import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private toastr : ToastrService, private spinner: NgxSpinnerService) { }

  showSuccess(message: string | undefined, title: string | undefined){
    this.toastr.success(message, title, {
      timeOut :  7000
    })
}

showError(message: string | undefined, title: string | undefined){
    this.toastr.error(message, title, {
      timeOut :  7000
    })
}

showInfo(message: string | undefined, title: string | undefined){
    this.toastr.info(message, title,
      {
        timeOut :  7000
      })
}

showWarning(message: string | undefined, title: string | undefined){
    this.toastr.warning(message, title,
      {
        timeOut :  7000
      })
}

showSpinner(){
  this.spinner.show();
  setTimeout(() => {

    this.spinner.hide();
  }, 2500);
}

showModal(){
  this.spinner.show();
}
}
