import express from "express";
import { ApplicationValidationSchema } from "../validations/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { JobApplicationController } from "../controllers/appplication.controller.js";

const router = express.Router();
router.get("/", authenticate, JobApplicationController.getAll);
router.get("/:id",authenticate,  JobApplicationController.get); // get a user by id
router.post("/", validate(ApplicationValidationSchema.add), JobApplicationController.add); //register a new user
router.delete("/:id",authenticate, JobApplicationController.delete); // deletes a user by id
router.patch("/:id",authenticate, JobApplicationController.update); // updates a user by id

export default router;
