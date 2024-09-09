import mongoose from "mongoose";

const investigadorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Complete este campo"]
    },
    password: {
      type: String,
      default: null,
    },
    responsable: {
      type: Boolean,
      required: [true, "Complete este campo"]
    },
    token: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "investigadores"
  }
);

export const InvestigadorModel = mongoose.model("Investigador", investigadorSchema);
