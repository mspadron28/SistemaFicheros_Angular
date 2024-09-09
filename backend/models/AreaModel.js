import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Complete este campo"]
    },
    departamentos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departamento" // Referencia a la colección Departamento
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "areas"
  }
);

export const AreaModel = mongoose.model("Area", areaSchema);
