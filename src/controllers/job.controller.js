import { JobService } from "../services/job.service.js";
import { httpResponse } from "../utils/index.js";

export const JobController = {
    getAll: async (req, res) => {
        try {
            const data = await JobService.getAll();
            console.log(data);

            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    get: async (req, res) => {
        try {
            const data = await JobService.get(req.params.id);
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
            const data = await JobService.getJobs(req.params.id,token);
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
          
            const data = await JobService.add(req.body);
            if (!data) {
                return httpResponse.NON_AUTHORITATIVE(res, data);
            } else {
                return httpResponse.CREATED(res, data);
            }
            // return httpResponse.CREATED(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    getUser: async (req, res) => {
        try {
         
            const data = await JobService.getUser(req.body);
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
    getStreams: async (req, res) => {
        try {
            const data = await JobService.getStreams(req.params.id);
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
    getStream: async (req, res) => {
        try {
            const data = await JobService.getStream(req.params.id, req.params.streamId);
            if (!data) {
                return httpResponse.NOT_FOUND(res);
            } else {
                return httpResponse.SUCCESS(res, data);
            }
            // return httpResponse.CREATED(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    delete: async (req, res) => {
        try {
            console.log(req.params.id);

            const data = await JobService.delete(req.params.id);
            // const data = await JobService.get(req.params.id);
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
    deleteStream: async (req, res) => {
        try {

            const data = await JobService.deleteStream(req.params.id, req.params.streamId);

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
        console.log(req.params.id);


        try {
            console.log(req.params.id);
            const data = await JobService.update(req.params.id, req.body);
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
