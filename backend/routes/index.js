import express from "express";
import organismoRoutes from "./organismoRoutes.js";
import convocatoriaRoutes from "./convocatoriaRoutes.js";
import solicitudRoutes from "./solicitudRoutes.js";
import investigadorRoutes from "./investigadorRoutes.js";
import grupoInvestigacionRoutes from "./grupoInvestigacionRoutes.js"; 
import departamentoRoutes from "./departamentoRoutes.js"; 
import areaRoutes from "./areaRoutes.js";
import superAdminRoutes from "./superAdminRoutes.js";

const router = express.Router();

router.use("/organismos", organismoRoutes);
router.use("/convocatorias", convocatoriaRoutes);
router.use("/solicitudes", solicitudRoutes);
router.use("/investigadores", investigadorRoutes);
router.use("/super-admin", superAdminRoutes);
router.use("/grupos-investigacion", grupoInvestigacionRoutes); 
router.use("/departamentos", departamentoRoutes); 
router.use("/areas", areaRoutes); 


export default router;
