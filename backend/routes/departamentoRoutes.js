
import express from "express";
import {
  getDepartamentos,
  getDepartamento,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from "../controllers/DepartamentoController.js";

const router = express.Router();

router.route("/").get(getDepartamentos).post(createDepartamento);
router.route("/:id").get(getDepartamento).put(updateDepartamento).delete(deleteDepartamento);

export default router;
