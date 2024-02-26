import express from "express";
import { getAdmins } from "../controllers/Management.js";
const router = express.Router();
router.get("/admins", getAdmins);
export default router;
