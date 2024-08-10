import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompanies, getCompanybyId, registerCompany, updateCompany } from "../controllers/company_controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated, getCompanies);
router.route("/get/:id").get(isAuthenticated,getCompanybyId);
router.route("/update/:id").put(isAuthenticated,updateCompany);

export default router;