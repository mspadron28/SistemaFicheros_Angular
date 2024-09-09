import mongoose from "mongoose";

const organismoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Complete este campo"]
    },
    password: {
      type: String,
      required: [true, "Complete este campo"]
    },
    direccion: {
      type: String,
      required: [true, "Complete este campo"]
    },
    poblacion: {
      type: String,
      required: [true, "Complete este campo"]
    },
    codigo_postal: {
      type: Number,
      required: [true, "Complete este campo"]
    },
    telefono: {
      type: Number,
      required: [true, "Complete este campo"]
    },
    convocatorias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Convocatoria" // Referencia a la colección Convocatoria
      }
    ],
    token: {
      type: String,
      default: null,
    }
  },
  
  {
    timestamps: true,
    versionKey: false,
    collection: "organismos"
  }
);

export const OrganismoModel = mongoose.model("Organismo", organismoSchema);
