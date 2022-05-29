import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../Entities/usuario';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // usuario : Usuario = {
  //   uid: '',
  //   nombre: 'Mariano',
  //   apellido: 'Luis',
  //   edad: 43,
  //   dni: 22334455,
  //   obraSocial: 'Osecac',
  //   email: 'mariano@utn.com',
  //   password: '123456',
  //   perfil: 'paciente'
  // }

public userForm! : FormGroup;

  usuario : Usuario = new Usuario();
  
  loginError : boolean | undefined;

  loginErrorUser : boolean | undefined;

  loginErrorPass : boolean | undefined;

  createUserError : string | null = null;

  submitted = false;

  constructor(private authService: AuthService, private router: Router,
              private firestore: FirebaseService, public formBuilder: FormBuilder, 
              private validatorService: ValidatorService,
              private interactionService : InteractionService
              ) 
              {}

  ngOnInit(): void {
      this.userForm = this.formBuilder.group(
                  {
                    nombre: ['', [Validators.required, Validators.minLength(3)]],
                    apellido: ['', [Validators.required, Validators.minLength(3)]],
                    edad: ['', [Validators.required, Validators.min(18),Validators.max(125)]],
                    dni: ['', [Validators.required, Validators.minLength(7)]],
                    obraSocial: ['', [Validators.required, Validators.minLength(4)]],
                    email: ['',[Validators.required, Validators.email]],
                    password: ['', [Validators.required, Validators.minLength(6)]],
                    password2: ['', [Validators.required, Validators.minLength(6)]],
                    perfil:[''],
                    file: [null]
                  },
                  {
                    validators: [ this.validatorService.checkPassword('password', 'password2')]
                  }
                )
               
  }

  /*########################## File Upload ########################*/
  // @ViewChild('fileInput') el: ElementRef;
  // imageUrl: any = '/assets/dummy-user.jpg';
  // editFile: boolean = true;
  // removeUpload: boolean = false;
  // uploadFile(event) {
  //   let reader = new FileReader(); // HTML5 FileReader API
  //   let file = event.target.files[0];
  //   if (event.target.files && event.target.files[0]) {
  //     reader.readAsDataURL(file);
  //     // When file uploads set it to file formcontrol
  //     reader.onload = () => {
  //       this.imageUrl = reader.result;
  //       this.userForm.patchValue({
  //         file: reader.result
  //       });
  //       this.editFile = false;
  //       this.removeUpload = true;
  //     }
  //     // ChangeDetectorRef since file is loading outside the zone
  //     this.cd.markForCheck();        
  //   }
  // }
  // // Function to remove uploaded file
  // removeUploadedFile() {
  //   let newFileList = Array.from(this.el.nativeElement.files);
  //   this.imageUrl = '/assets/dummy-user.jpg';
  //   this.editFile = true;
  //   this.removeUpload = false;
  //   this.userForm.patchValue({
  //     file: [null]
  //   });
  // }
  
  async Registrar(){

    this.interactionService.showSpinner();

    this.loginError = false;
    this.loginErrorUser = false;
    this.loginErrorPass = false;

    this.createUserError = null;

    // this.usuario.nombre = this.userForm.value.nombre;
    // this.usuario.apellido= this.userForm.value.apellido;
    // this.usuario.edad = this.userForm.value.edad;
    // this.usuario.dni = this.userForm.value.dni;
    // this.usuario.obraSocial= this.userForm.value.obraSocial;
    // this.usuario.perfil = "paciente";
     
    this.usuario = this.userForm.value;
   // console.log(this.usuario);

    const res = await this.authService.Register(this.usuario)
                .then( (res)=>{
                  console.log( res.user?.uid);
                  if(res.user){
                    this.usuario.uid = res.user.uid;
                    this.usuario.password='';
                    this.usuario.password2 = '';
                    this.firestore.createUsuario(this.usuario).then
                    ( () => {
                         this.interactionService.showSuccess("Se ha registrado un nuevo usuario e ingresado al sistema.", "Registro exitoso")
                        })
                  }
                  this.router.navigate(['home']);
                })
                .catch( (error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;

                  console.log(errorCode);
                  console.log(errorMessage);

                  console.log(error);
                  
                  if (errorCode == 'auth/email-already-in-use') {
                    this.createUserError = "Correo electronico ya está en uso";
                  //   console.log("auth/email-already-in-use");
                  // }
                  // } else {auth/invalid-email
                  }
                  else if(errorCode == 'auth/invalid-email'){
                    this.createUserError = "El correo electronico no tiene formato valido";
                  }else{
                    this.createUserError= errorCode;
                  }
                });
  }
}
