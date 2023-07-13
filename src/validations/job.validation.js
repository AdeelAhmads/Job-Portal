import Joi from "joi";

export const JobValidationSchema = {
    add: {
        body: Joi.object().keys({
            jobTitle: Joi.string().required(),
            location: Joi.string().required(),
            offerSalary: Joi.string().required(),
            user_id: Joi.string().required()
        }),
    },
};
