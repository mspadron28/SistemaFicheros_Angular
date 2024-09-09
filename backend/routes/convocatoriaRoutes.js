
import express from "express";
import {
  getConvocatorias,
  getConvocatoria,
  createConvocatoria,
  updateConvocatoria,
  deleteConvocatoria,
} from "../controllers/ConvocatoriaController.js";

const router = express.Router();

router.route("/").get(getConvocatorias).post(createConvocatoria);
router.route("/:id").get(getConvocatoria).put(updateConvocatoria).delete(deleteConvocatoria);

export default router;
