import express from "express";

// routes
import userRoute from "./user.route.js";
import jobRoute from "./job.route.js";


const protectedRouter = express.Router();
const unProtectedRouter = express.Router();

// Protected Routes

// Un-Protected Routes
unProtectedRouter.use("/user", userRoute);
unProtectedRouter.use("/job", jobRoute);


export { protectedRouter, unProtectedRouter };
