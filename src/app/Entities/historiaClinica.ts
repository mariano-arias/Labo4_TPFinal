
export class HistoriaClinica {
    id?: string;
    turnoId!: string;
    profesionalId!: string; 
    pacienteId!: string; 
    especialidad!: string; 
    // fecha!: Date | number; 
    peso!: number;
    temperatura!: number;
    presion!: number;
    altura!: number;
    datosAdicionales!: DatosDinamicos[]
    texto!: string;
}

export class DatosDinamicos {
    clave!: string;
    valor!: number;
}