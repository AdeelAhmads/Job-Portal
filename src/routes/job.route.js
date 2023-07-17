import express from "express";
import { JobValidationSchema } from "../validations/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { JobController } from "../controllers/index.js";

const router = express.Router();
router.get("/", authenticate, JobController.getAll);
router.get("/:id",authenticate,  JobController.get); // get a user by id
router.get("/user/:id",authenticate, JobController.getJobs); // get jobs by the user id
router.get("/:id/applications",authenticate, JobController.getApplications); // get jobs by the user id
router.post("/post", validate(JobValidationSchema.add), JobController.add); //register a new user
router.delete("/:id",authenticate, JobController.delete); // deletes a user by id
router.patch("/:id",authenticate, JobController.update); // updates a user by id

export default router;
