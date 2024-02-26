import express from "express";
import { getAdmins } from "../controllers/Management";
const router = express.Router();
router.get("/admins", getAdmins);
export default router;
