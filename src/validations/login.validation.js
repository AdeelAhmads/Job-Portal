import Joi from "joi";

export const LoginValidationSchema = {
	add: {
		body: Joi.object().keys({
			email: Joi.string().required(),
			password: Joi.string().required()
		}),
	},
};
