import mongoose from "mongoose";

const job = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    location: { type: String, required:true },
    offerSalary:{type:String,required:true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

export const JobModel = mongoose.model("Job", job);