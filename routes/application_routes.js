import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyjob, getapplicant, getapplyjobs, updateStatus } from "../controllers/application_controller.js";


const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyjob);
router.route("/get").get(isAuthenticated, getapplyjobs);
router.route("/applicants/:id").get(isAuthenticated,getapplicant);
router.route("/status/update/:id").post(isAuthenticated,updateStatus);

export default router;