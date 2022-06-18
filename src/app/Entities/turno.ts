export class Turno {

    id : string ='';
    pacienteId! : string;
    pacienteNombre!: string;
    especialistaId! : string;
    especialistaNombre!: string;
    especialidadId!: string;
    especialidadNombre!:string | null;
    fecha!: Date;
    startStr! : string;
    endStr! : string;
    estado! : string; // solicitado - aceptado -realizado -cancelado rechazado
    comentario! : string;
   // activo! : boolean;
}
