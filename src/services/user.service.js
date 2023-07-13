
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

	get: async (id) => {

		const users = await UserModel.find()

		console.log(users);
		for (const user of users) {

			if (user.id === id) {
				return await UserModel.findById(id);
			}

		}

	},

	getJobs: async (id) => {


		console.log(id);
		const user = await UserModel.findById(id);
		console.log(user);
		console.log(user.userType);
		if (user.userType == "creator") {
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


			// const token = jwt.sign(body, config.env.jwtSecret);

			const hashedPassword = passwordHash.generate(body.password);
			delete body.password;
			body.password = hashedPassword;
			console.log(body);
			const data = await UserModel.create(body);
			return data;
		}

	},

	delete: async (id) => {
		const users = await UserModel.find()
		for (const user of users) {

			if (user.id === id) {
				return await UserModel.findByIdAndDelete(id);
			}

		}

	},
	update: async (id, body) => {

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



	},
	getUser: async (body) => {

		const users = await UserModel.find()

		for (const user of users) {
			// console.log(user);
			// console.log(body.email);
			if (user.email === body.email) {
				if (passwordHash.verify(body.password, user.password)) {
					console.log('user info');
                     console.log(user);
					 console.log(user._id);
					 const data={
						name:user.name,
						email:user.email,
						password:user.password,
						id:user._id,
						userType:user.userType
					 }
					const token = jwt.sign(data, config.env.jwtSecret);
					console.log(token);
					return { user, token }

				}

			}

		}
	},
	getStreams: async (id) => {


		const data = await UserModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "streams",
					localField: "_id",
					foreignField: "user_id",
					as: "stream_record",
				},
			},
		]);

		return data;

	},
	// getStream: async (id, streamId) => {

	// 	const data = await StreamModel.aggregate([
	// 		{
	// 			$match: {
	// 				_id: new mongoose.Types.ObjectId(streamId),
	// 				user_id: mongoose.Types.ObjectId(id)
	// 			},
	// 		},

	// 	]);

	// 	return data


	// }


};
