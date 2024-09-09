import express from "express";
import {
  getOrganismos,
  getOrganismo,
  getConvocatoriasByOrganismo,
  createOrganismo,
  updateOrganismo,
  deleteOrganismo,
  loginOrganismo  
} from "../controllers/OrganismoController.js";

const router = express.Router();

router.route("/").get(getOrganismos).post(createOrganismo);
router.route("/:id").get(getOrganismo).put(updateOrganismo).delete(deleteOrganismo);

router.route("/:organismoId/convocatorias").get(getConvocatoriasByOrganismo);

router.route("/login").post(loginOrganismo);

export default router;
