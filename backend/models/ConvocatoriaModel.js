import mongoose from "mongoose";

const convocatoriaSchema = new mongoose.Schema(
  {
    programa: {
      type: String,
      required: [true, "Complete este campo"]
    },
    fecha_publicacion: {
      type: Date,
      required: [true, "Complete este campo"]
    },
    fecha_limite: {
      type: Date,
      required: [true, "Complete este campo"]
    },
    direccion_web: {
      type: String,
      required: [true, "Complete este campo"]
    },
    numero_BOE_DOGV: {
      type: Number,
      required: [true, "Complete este campo"]
    },
    fecha_resolucion: {
      type: Date,
      required: [true, "Complete este campo"]
    },
    solicitudes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solicitud" // Referencia a la colección Solicitud
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "convocatorias"
  }
);

export const ConvocatoriaModel = mongoose.model("Convocatoria", convocatoriaSchema);
