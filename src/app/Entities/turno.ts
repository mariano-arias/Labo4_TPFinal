import { HistoriaClinica } from "./historiaClinica";

export class Turno {

    id! : string;
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
  //  comentario! : string;
    calificacion!: string;
    resultadoCita! : HistoriaClinica;
   // activo! : boolean;
//    peso!: number;
//    temperatura!: number;
//    presion!: number;
//    altura!: number;
//    extra_data!: DatosDinamicos[]
// }

// export class DatosDinamicos {
//    key!: string;
//    value!: string;
}
