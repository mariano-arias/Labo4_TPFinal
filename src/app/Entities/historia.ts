import { Usuario } from "./usuario";

export class Historia {
    id?: string;
    profesional!: Usuario; 
    paciente!: Usuario; 
    especialidad!: string; 
    fecha!: Date | number; 
    peso!: number;
    temperatura!: number;
    presion!: number;
    altura!: number;
    extra_data!: DatosDinamicos[]
    descripcion!: string;
}

export class DatosDinamicos {
    key!: string;
    value!: string;
}