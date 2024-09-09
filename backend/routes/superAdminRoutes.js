
import express from "express";
import {
    getSuperAdmin,
    createSuperAdmin,
    loginSuperAdmin
} from "../controllers/SuperAdminController.js";

const router = express.Router();

router.route("/").get(getSuperAdmin).post(createSuperAdmin);

router.route("/login").post(loginSuperAdmin);

export default router;
