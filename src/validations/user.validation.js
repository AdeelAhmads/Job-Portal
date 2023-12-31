import Joi from "joi";

export const UserValidationSchema = {
	add: {
		body: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required(),
			password: Joi.string().required(),
			userType: Joi.string().required()
		}),
	},
};
