import mongoose from "mongoose";

const departamentoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Complete este campo"]
    },
    nombre_director: {
      type: String,
      required: [true, "Complete este campo"]
    },
    investigadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Investigador" // Referencia a la colección Investigador
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "departamentos"
  }
);

export const DepartamentoModel = mongoose.model("Departamento", departamentoSchema);
