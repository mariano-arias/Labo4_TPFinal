import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  checkPassword( pass1: string, pass2: string)
  {
    return ( formGroup: AbstractControl) : ValidationErrors | null =>{
      const aux1 = formGroup.get(pass1)?.value;
      const aux2 =  formGroup.get(pass2)?.value;

      if(aux1 !== aux2){
        formGroup.get(pass2)?.setErrors({noIguales : true});
        return {noIguales: true}
      }
    formGroup.get(pass2)?.setErrors(null)
    return null;
    }
  }
}