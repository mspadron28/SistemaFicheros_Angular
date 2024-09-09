export interface GrupoInvestigacion {
    _id: string;
    investigador_responsable_id: string;
    nombre: string;
    participantes: string[];
    createdAt: Date;
    updatedAt: Date;
  }