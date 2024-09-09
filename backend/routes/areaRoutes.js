
import express from "express";
import {
  getAreas,
  getArea,
  createArea,
  updateArea,
  deleteArea,
} from "../controllers/AreaController.js";

const router = express.Router();

router.route("/").get(getAreas).post(createArea);
router.route("/:id").get(getArea).put(updateArea).delete(deleteArea);

export default router;
