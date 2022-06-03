import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../Entities/usuario';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {

  public userForm!: FormGroup;

  usuario: Usuario = new Usuario();

  loginError: boolean | undefined;

  loginErrorUser: boolean | undefined;

  loginErrorPass: boolean | undefined;

  createUserError: string | null = null;

  submitted = false;

  perfil: string | undefined = 'paciente';

  imgFile1: any = null;
  imgFile2: any = null;

  filesAdjuntos: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: FirebaseService,
    public formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private interactionService: InteractionService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellido: ['', [Validators.required, Validators.minLength(3)]],
        edad: [
          '',
          [Validators.required, Validators.min(18), Validators.max(125)],
        ],
        dni: ['', [Validators.required, Validators.minLength(7)]],
        obraSocial: [''],
        especialidad: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]],
        perfil: ['', [Validators.required]],
      },
      {
        validators: [
          this.validatorService.checkPassword('password', 'password2'),
        ],
      }
    );
  }

  SetPerfil(p: string) {
    console.log(p);

    if (p != 'paciente') {
      this.perfil = 'especialista';
    }
  }

  uploadFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files);
      if (event.target.files.length > 1 && this.perfil != 'paciente') {
        this.interactionService.showWarning(
          'Especialista solo puede cargar una imagen',
          'Error'
        );
        event.target.files = null;
        return;
      }
      if (event.target.files.length > 2) {
        this.interactionService.showWarning(
          'Paciente puede cargar sólo hasta dos imagenes',
          'Error'
        );
        event.target.files = null;
        return;
      }

      this.filesAdjuntos = event.target.files;

      let reader = new FileReader();

      reader.readAsDataURL(this.filesAdjuntos[0]);
      reader.onloadend = () => {

        this.imgFile1 = reader.result;
      };

      if (this.filesAdjuntos.length > 1) {
        let reader2 = new FileReader();
        reader2.readAsDataURL(this.filesAdjuntos[1]);
        reader2.onloadend = () => {

          this.imgFile2 = reader2.result;
        };
      }
    }
  }

 async Registrar() {
    this.interactionService.showSpinner();

    this.loginError = false;
    this.loginErrorUser = false;
    this.loginErrorPass = false;

    this.createUserError = null;

    this.usuario = this.userForm.value;

    const res = await this.authService
      .Register(this.usuario)
      .then((res) => {
        if (res.user) 
        {
          this.usuario.uid = res.user.uid;
          this.usuario.password = '';
          this.usuario.password2 = '';

          let fileName = this.usuario.uid + '_' + Date.now();

          if (this.imgFile1) {
            this.storageService
            .FileUpload(fileName, this.imgFile1)
            .then(() => {
                this.usuario.imagen1Name = fileName;
                console.log('imagen 1 subida ok');
              })
            .catch(() => console.log('Error en subida imagen1'));
          }

          if (this.imgFile2) {
            fileName = this.usuario.uid + '_' + Date.now();

            this.storageService
              .FileUpload(fileName, this.imgFile2)
              .then((res) => {
                this.usuario.imagen2Name = fileName;
                console.log('imagen 2 subida ok');
              })
              .catch(() => console.log('Error en subida imagen 2'));
          }

          this.usuario.photoPerfilURL = "null"
          this.usuario.photoAuxURL = "null";

          this.firestore.createUsuario(this.usuario).then(
            () => {
            this.interactionService.showSuccess(
              'Se ha registrado un nuevo usuario.',
              'Registro exitoso'
            );
            this.interactionService.showWarning(
              "Debe validar su email. Se ha enviado un correo electronico a la direccion informada",
              "Validar Email");
          });
          this.authService.sendEmail(res.user);
         // this.authService.Logout(); //si hago esto no completa el metodo de crear el usuario;
          this.router.navigate(['']);
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/email-already-in-use') {
          this.createUserError = 'Correo electronico ya está en uso';

        } else if (errorCode == 'auth/invalid-email') {
          this.createUserError =
            'El correo electronico no tiene formato valido';
        } else {
          this.createUserError = errorCode;
        }
      });
  }
}
