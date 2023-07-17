import { UserService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const UserController = {
	getAll: async (req, res) => {
		try {
			const data = await UserService.getAll();
			return httpResponse.SUCCESS(res, data);
		} catch (error) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, error);
		}
	},
	get: async (req, res) => {
		try {
			const token = req.header("authorization");
			const data = await UserService.get(req.params.id, token);
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
			const data = await UserService.getJobs(req.params.id, token);
			if (!data) {
				return httpResponse.NOT_FOUND(res, data);
			} else {
				return httpResponse.SUCCESS(res, data);
			}
			
		} catch (error) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, error);
		}
	},

	add: async (req, res) => {
		try {
			const data = await UserService.add(req.body);
			if (!data) {
				return httpResponse.CONFLICT(res, data);
			} else {
				return httpResponse.CREATED(res, data);
			}
			
		} catch (error) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, error);
		}
	},
	getUser: async (req, res) => {
		try {
			const data = await UserService.getUser(req.body);
			if (!data) {
				return httpResponse.NOT_FOUND(res, data);
			} else {
				return httpResponse.SUCCESS(res, data);
			}
		} catch (error) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, error);
		}
	},
	
	delete: async (req, res) => {
		try {

			const token = req.header("authorization");
			const data = await UserService.delete(req.params.id, token);
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
			return httpResponse.INTERNAL_SERVER_ERROR(res, error);
		}
	},
	
	update: async (req, res) => {
		try {
			const token = req.header("authorization"); 
			const data = await UserService.update(req.params.id, req.body,token);
			if(data=="unauthorized") {
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
