
import { JobAppliedModel } from "../models/application.model.js";

import jwt from "jsonwebtoken";
import config from "../config/index.js";
import passwordHash from 'password-hash';
import mongoose from "mongoose";
export const JobApplicationService = {
    getAll: async () => {
        return JobAppliedModel.find();
    },

    get: async (id) => {

        return await JobAppliedModel.findById(id);
    },

    add: async (body, token) => {

        const bearerToken = token.split(" ")[1];
        const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);
      
        body.applicant = userInfo.name;
        body.user_id = userInfo.id;

        if (userInfo.userType == "applicant") {
            return await JobAppliedModel.create(body);
        }

    },

    delete: async (id) => {
        const jobs = await JobAppliedModel.find()
        for (const job of jobs) {

            if (job.id === id) {
                return await JobAppliedModel.findByIdAndDelete(id);
            }

        }

    },
    update: async (id, body) => {
        const job = await JobAppliedModel.findById(id);
        if (job) {

            if (body.job_id) {
                job.job_id = body.job_id;
            }

            await job.save();
            return job;

        }



    },

    getjob: async (body) => {

        const jobs = await JobAppliedModel.find()

        for (const job of jobs) {

            if (job.email === body.email) {
                if (passwordHash.verify(body.password, job.password)) {

                    const token = jwt.sign(body, config.env.jwtSecret);
                    return { job, token }

                }

            }

        }
    },



};
