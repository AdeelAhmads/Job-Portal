import mongoose from "mongoose";

const jobApplied = new mongoose.Schema({
    appliedJobTitle: { type: String, required: true },
    applied_By: { type: String, required: true },
    job_id: { type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
});

export const JobAppliedModel = mongoose.model("JobApplied", jobApplied);