import mongoose from "mongoose";

const jobApplied = new mongoose.Schema({
    applicant: {
        type: String, required: true,
    },
    applied_at: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
});

export const JobAppliedModel = mongoose.model("JobApplied", jobApplied);