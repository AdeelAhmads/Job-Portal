
import { UserModel } from "../models/index.js";
// import { StreamModel } from "../models/index.js";
import { JobModel } from "../models/index.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import passwordHash from 'password-hash';
import mongoose from "mongoose";
export const UserService = {

	getAll: async () => {
		return UserModel.find();
	},

	get: async (id, token) => {

		const bearerToken = token.split(" ")[1];
		const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);
		if (userInfo.id == id) {
			return await UserModel.findById(id);
		}
		else {
			return "unauthorized";
		}
	},

	getJobs: async (id, token) => {
		
		const bearerToken = token.split(" ")[1];
		const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);
		if (userInfo.userType == "creator") {
			const data = await UserModel.aggregate([
				{
					$match: {
						_id: new mongoose.Types.ObjectId(id),
					},
				},
				{
					$lookup: {
						from: "jobs",
						localField: "_id",
						foreignField: "user_id",
						as: "jobs_record",
					},
				},
			]);
			return data;
		}
		else {
			return await JobModel.find();
		}

	},

	add: async (body) => {
		let data;
		data = await UserModel.find({ email: body.email });

		if (data.length == 0) {
			const hashedPassword = passwordHash.generate(body.password);
			delete body.password;
			body.password = hashedPassword;
			const data = await UserModel.create(body);
			return data;
		}

	},

	delete: async (id, token) => {

		const bearerToken = token.split(" ")[1];
		const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);
		if (userInfo.id == id) {
			return await UserModel.findByIdAndDelete(id);
		}
		else {
			return "unauthorized";
		}

	},
	update: async (id, body) => {

		const bearerToken = token.split(" ")[1];
		const userInfo = jwt.verify(bearerToken, config.env.jwtSecret);
		if (userInfo.id == id) {
			const user = await UserModel.findById(id);

			if (user) {
				if (body.name) {
					user.name = body.name;
				}
				if (body.password) {
					const hashedPassword = passwordHash.generate(body.password);
					delete user.password;
					user.password = hashedPassword;
				}
				if (body.email) {
					user.email = body.email;
				}
				if (body.userType) {
					user.userType = body.userType;
				}
				await user.save();
				return user;
			}

		}
		else {
			return "unauthorized";
		}




	},
	getUser: async (body) => {

		const users = await UserModel.find()
		for (const user of users) {
			if (user.email === body.email) {
				if (passwordHash.verify(body.password, user.password)) {

					const data = {
						name: user.name,
						email: user.email,
						password: user.password,
						id: user._id,
						userType: user.userType
					}
					const token = jwt.sign(data, config.env.jwtSecret);
					return { user, token }

				}

			}

		}
	},
};
