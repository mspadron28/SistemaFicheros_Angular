// routes/grupoInvestigacionRoutes.js
import express from "express";
import {
  getGruposInvestigacion,
  getGrupoInvestigacion,
  createGrupoInvestigacion,
  updateGrupoInvestigacion,
  deleteGrupoInvestigacion,
} from "../controllers/GrupoInvestigacionController.js";

const router = express.Router();

router.route("/").get(getGruposInvestigacion).post(createGrupoInvestigacion);
router.route("/:id").get(getGrupoInvestigacion).put(updateGrupoInvestigacion).delete(deleteGrupoInvestigacion);

export default router;
