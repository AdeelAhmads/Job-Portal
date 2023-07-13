
import { JobModel } from "../models/job.model.js";
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import passwordHash from 'password-hash';
import mongoose from "mongoose";
export const JobService = {
    getAll: async () => {
        return JobModel.find();
    },

    get: async (id) => {
        return await JobModel.findById(id);
    },
    getJobs: async (id, token) => {

        const bearerToken = token.split(" ")[1];


        const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);
        // decoded payload will be available in req.user
        console.log(userInfo);
        console.log(userInfo.userType);


        const creatorUsers = [];

        const users = await JobModel.find();
        // console.log(user);
        for (const user of users) {
            if (user.user_id == id) {
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
    },

    add: async (body) => {
        const user = await UserModel.find({ _id: body.user_id });
        console.log(user);
        // console.log(user[0].userType);
        if (user[0].userType == "creator") {
            return await JobModel.create(body);
        }

    },

    delete: async (id) => {
        const jobs = await JobModel.find()
        for (const job of jobs) {

            if (job.id === id) {
                return await JobModel.findByIdAndDelete(id);
            }

        }

    },
    update: async (id, body) => {

        const jobs = await JobModel.find()
        for (const job of jobs) {

            if (job.id === id) {
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



            }

        }



    },

    getjob: async (body) => {

        const jobs = await JobModel.find()

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
