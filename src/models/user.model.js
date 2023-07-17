import mongoose from "mongoose";

const user = new mongoose.Schema({
	name: { type: String, required: true, index: true },
	email: { type: String, unique: true },
	password: { type: String, require:true},
	userType: {type: String,
        enum : ['creator','applicant'],
        default: 'applicant' },
});

export const UserModel = mongoose.model("User", user);
