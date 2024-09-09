  export interface Organismo {
      _id: string;
      nombre: string;
      direccion: string;
      poblacion: number;
      codigo_postal: number;
      telefono: number;
      convocatorias: string[]; 
      createdAt: Date;
      updatedAt: Date;
    }