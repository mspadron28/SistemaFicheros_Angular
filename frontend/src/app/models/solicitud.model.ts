export interface Solicitud {
    _id: string;
    titulo_proyecto: string;
    fecha_presentacion: Date;
    fecha_resolucion: Date;
    importe_economico: number;
    fecha_inicioProyecto: Date;
    fecha_finProyecto: Date;
    estado: boolean;
    participantes: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  