import express from "express";
import { UserValidationSchema } from "../validations/index.js";
import { LoginValidationSchema } from "../validations/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { UserController } from "../controllers/index.js";

const router = express.Router();
router.get("/", authenticate, UserController.getAll);
router.get("/:id",authenticate,  UserController.get); // get a user by id
router.get("/:id/jobs", authenticate, UserController.getJobs )
router.post("/register", validate(UserValidationSchema.add), UserController.add); //register a new user
router.post("/login", validate(LoginValidationSchema.add), UserController.getUser); //login a new user
router.delete("/:id",authenticate, UserController.delete); // deletes a user by id
router.patch("/:id",authenticate, UserController.update); // updates a user by id

export default router;
