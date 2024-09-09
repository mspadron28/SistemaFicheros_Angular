import mongoose from "mongoose";

const superadminSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Complete este campo"]
    },
    password: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "superadmin"
  }
);

export const SuperAdminModel = mongoose.model("SuperAdmin", superadminSchema);
