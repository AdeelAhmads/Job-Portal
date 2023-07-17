import { JobApplicationService } from "../services/application.service.js";
import { httpResponse } from "../utils/index.js";

export const JobApplicationController = {
    getAll: async (req, res) => {
        try {
            const data = await JobApplicationService.getAll();
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    get: async (req, res) => {
        try {

            const data = await JobApplicationService.get(req.params.id);
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
    add: async (req, res) => {
        try {

            const token = req.header("authorization");
            const data = await JobApplicationService.add(req.body, token);
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

            const data = await JobApplicationService.delete(req.params.id);

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
            const data = await JobApplicationService.update(req.params.id, req.body);
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
