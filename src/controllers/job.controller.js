import { JobService } from "../services/job.service.js";
import { httpResponse } from "../utils/index.js";

export const JobController = {
    getAll: async (req, res) => {
        try {
            const token = req.header("authorization");
            const data = await JobService.getAll(token);
            if (data == "unauthorized") {
                return httpResponse.NON_AUTHORITATIVE(res, data);
            }
            if (!data) {
                return httpResponse.NOT_FOUND(res, data)
            }
            else {
                return httpResponse.SUCCESS(res, data);
            }


        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    get: async (req, res) => {
        try {
            const token = req.header("authorization");
            const data = await JobService.get(req.params.id, token);
            if (data == "unauthorized") {
                return httpResponse.NON_AUTHORITATIVE(res, data);
            }
            if (!data) {
                return httpResponse.NOT_FOUND(res, data)
            }
            else {
                return httpResponse.SUCCESS(res, data);
            }

        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    getJobs: async (req, res) => {


        try {
            const token = req.header("authorization");
            const data = await JobService.getJobs(req.params.id, token);
            if (data == "unauthorized") {
                return httpResponse.NON_AUTHORITATIVE(res, data);
            }
            if (!data) {
                return httpResponse.NOT_FOUND(res, data);
            } else {
                return httpResponse.SUCCESS(res, data);
            }
            // return httpResponse.CREATED(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    getApplications: async (req, res) => {
        try {
            const token = req.header("authorization");
            const data = await JobService.getApplications(req.params.id, token);
            if(data=="unauthorized"){
                return httpResponse.NON_AUTHORITATIVE(res, data);
            }
            if (!data) {
                return httpResponse.NOT_FOUND(res, data);
            } else {
                return httpResponse.SUCCESS(res, data);
            }
            // return httpResponse.CREATED(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },

    add: async (req, res) => {
        try {
            const token = req.header("authorization");
            const data = await JobService.add(req.body, token);
            if (!data) {
                return httpResponse.NON_AUTHORITATIVE(res, data);
            } else {
                return httpResponse.CREATED(res, data);
            }
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    delete: async (req, res) => {
        try {
            const token = req.header("authorization");
            const data = await JobService.delete(req.params.id,token);
            if (data == "unauthorized") {
                return httpResponse.NON_AUTHORITATIVE(res, data);
            }
            if (!data) {
                return httpResponse.NOT_FOUND(res, data)
            }
            else {
                return httpResponse.SUCCESS(res, data);
            }
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    update: async (req, res) => {

        try {
            const token = req.header("authorization");
            const data = await JobService.update(req.params.id, req.body,token);
            if(data=="unauthorized"){
                return httpResponse.NON_AUTHORITATIVE(res, data);
            }
            if (!data) {
                return httpResponse.NOT_FOUND(res, data)
            }
            else {
                return httpResponse.SUCCESS(res, data);
            }
        } catch (error) {
            return httpResponse.NOT_FOUND(res, error);
        }
    }
};
