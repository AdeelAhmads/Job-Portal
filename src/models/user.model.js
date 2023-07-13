import mongoose from "mongoose";

const user = new mongoose.Schema({
	name: { type: String, required: true, index: true },
	email: { type: String, unique: true },
	password: { type: String, require:true},
	userType:  { type: String, required: true}
});

export const UserModel = mongoose.model("User", user);
