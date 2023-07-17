import Joi from "joi";

export const ApplicationValidationSchema = {
    add: {
        body: Joi.object().keys({
            job_id: Joi.string().required()
        }),
    },
};
