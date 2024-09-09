// investigador.model.ts
export interface Investigador {
    _id: string;
    nombre: string;
    responsable: boolean;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  