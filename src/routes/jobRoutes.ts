import express from "express";
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
} from "../controllers/jobController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getJobs).post(protect, admin, createJob);
router.route("/:id").get(getJobById).delete(protect, admin, deleteJob);

export default router;
