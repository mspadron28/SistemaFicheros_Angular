
import express from "express";
import {
  getInvestigadores,
  getInvestigador,
  createInvestigador,
  updateInvestigador,
  deleteInvestigador,
  loginInvestigador
} from "../controllers/InvestigadorController.js";
const router = express.Router();

router.route("/").get(getInvestigadores).post(createInvestigador);
router.route("/:id").get(getInvestigador).put(updateInvestigador).delete(deleteInvestigador);

router.route("/login").post(loginInvestigador);



export default router;
