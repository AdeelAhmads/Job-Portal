
import { JobModel } from "../models/job.model.js";
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import passwordHash from 'password-hash';
import mongoose from "mongoose";
export const JobService = {
    getAll: async (token) => {
        const bearerToken = token.split(" ")[1];
        const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);
        if (userInfo.userType == 'creator') {
            return JobModel.find();
        }
        else {
            return "unauthorized";
        }

    },

    get: async (id, token) => {
        const bearerToken = token.split(" ")[1];
        const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);
        if (userInfo.id == id) {
            return await JobModel.findById(id);
        }
        else {
            return "unauthorized";
        }
    },
    getJobs: async (id, token) => {



        const bearerToken = token.split(" ")[1];
        const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);

        if (id == userInfo.id) {

            const creatorUsers = [];

            const users = await JobModel.find();
            for (const user of users) {
                if (user.user_id == userInfo.id) {
                    creatorUsers.push(user);
                }

            }

            if (userInfo.userType == "creator") {
                return creatorUsers;
            }
            else {
                console.log('true');
                return users;

            }
        } else {
            return "unauthorized";
        }
    },

    getApplications: async (id, token) => {

        const bearerToken = token.split(" ")[1];
        const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);

        if (id == userInfo.id) {

            const data = await JobModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "jobapplieds",
                        localField: "_id",
                        foreignField: "job_id",
                        as: "applications_record",
                    },
                },
            ])
            return data;
        } else {
            return "unauthorized";
        }
    },

    add: async (body, token) => {
        const bearerToken = token.split(" ")[1];
        const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);
        if (userInfo.userType == "creator") {
            return await JobModel.create(body);
        }

    },

    delete: async (id, token) => {

        const bearerToken = token.split(" ")[1];
        const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);

        if (userInfo.id == id) {
            return await JobModel.findByIdAndDelete(id);
        }
        else {
            return "unauthorized";
        }
    },
    update: async (id, body, token) => {

        const bearerToken = token.split(" ")[1];
        const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);

        if (userInfo.id === id) {
            const job = await JobModel.findById(id);
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
        } else {
            return "unauthorized";
        }
    },
};
