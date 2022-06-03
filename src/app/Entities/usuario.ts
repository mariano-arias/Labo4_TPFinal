export class Usuario {

    uid! : string;
    nombre! : string;
    apellido! : string;
    edad! : number;
    dni! : number;
    obraSocial! : string;
    especialidad! : string;
    email! : string;
    password! : string;
    password2! : string;
    perfil! : string;
    activo : boolean = false;

    imagen1Name!: string;
    
    imagen2Name!: string;

    photoPerfilURL! : string;
    photoAuxURL! : string;
}
