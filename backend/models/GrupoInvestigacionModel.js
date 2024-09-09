import mongoose from "mongoose";

const grupoInvestigacionSchema = new mongoose.Schema(
  {
    investigador_responsable_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investigador", // Referencia al investigador responsable
      required: true
    },
    nombre: {
      type: String,
      required: [true, "Complete este campo"]
    },
    participantes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Investigador" // Referencia a la colección Investigador
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "grupos_investigaciones"
  }
);

export const GrupoInvestigacionModel = mongoose.model("Grupo_Investigacion", grupoInvestigacionSchema);
