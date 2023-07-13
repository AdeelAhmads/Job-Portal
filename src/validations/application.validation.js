import Joi from "joi";

export const ApplicationValidationSchema = {
    add: {
        body: Joi.object().keys({
            appliedJobTitle: Joi.string().required(),
            applied_By: Joi.string().required(),
            job_id: Joi.string().required()
        }),
    },
};

