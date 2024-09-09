
export interface Convocatoria {
    _id: string;
    programa: string;
    fecha_publicacion: Date;
    fecha_limite: Date;
    direccion_web: string;
    numero_BOE_DOGV: number;
    fecha_resolucion: Date;
    solicitudes: string[];  
    createdAt: Date;
    updatedAt: Date;
  }
  