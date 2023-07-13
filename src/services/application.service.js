
import { JobAppliedModel } from "../models/application.model.js";

import jwt from "jsonwebtoken";
import config from "../config/index.js";
import passwordHash from 'password-hash';
import mongoose from "mongoose";
export const JobService = {
    getAll: async () => {
        return JobAppliedModel.find();
    },

    get: async (id) => {
        return await JobAppliedModel.findById(id);
    },

    add: async (body) => {
        const user = await JobAppliedModel.find({ _id: body.user_id });
        console.log(user);
        // console.log(user[0].userType);
        if (user[0].userType == "creator") {
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

        const jobs = await JobAppliedModel.find()
        for (const job of jobs) {

            if (job.id === id) {
                const job = await JobAppliedModel.findById(id);
                if (job) {
                    if (body.jobTitle) {
                        job.jobTitle = body.jobTitle;
                    }
                    if (body.location) {
                        job.location = body.location;
                    }
                    if (body.offerSalary) {
                        job.offerSalary = body.offerSalary;
                    }
                    await job.save();
                    return job;

                }



            }

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
