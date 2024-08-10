import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAlljobs, getJobByAdmin, getJobById, postJob } from "../controllers/job_controller.js";
const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated, getAlljobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getbyadmin").get(isAuthenticated,getJobByAdmin);

export default router;