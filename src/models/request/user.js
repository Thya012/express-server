const Joi = require('@hapi/joi');

module.exports = {
    0: {
        body: {
            username: Joi.string().required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().optional(),

            dateOfBirth: Joi.date(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{8,12}$")),
            confirmPassword: Joi.ref("password"),
        },
        model: "createUser", // Name of the model
        group: "Users", // Swagger tag for apis.
        description: "Create user and save details in database"
    },
    1: {
        query: {
            limit: Joi.number()
                .optional()
                .default(100)
                .description('Number of items to take'),
            page: Joi.number().optional().default(10),
            sort: Joi.string().optional(),
            query: Joi.string().optional(),
            populate: Joi.string().optional(),
            select: Joi.string().optional(),
        },
        model: 'getAllUsers',
        group: 'Users',
        description: 'Get all users',
    },
    2: {
        path: {
            id: Joi.string().required()
        },
        group: "Users", // Swagger tag for apis.
        description: "Get user by Id"
    },
    3: {
        path: {
            id: Joi.string().required()
        },
        group: "Users", // Swagger tag for apis.
        description: "Delete user by Id"
    },
    4: {
        path: {
            id: Joi.string().required()
        },
        body: {
            username: Joi.string().required(),
            firstname: Joi.string().required(),
            lastname: Joi.string().optional(),
            dateOfBirth: Joi.date(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{8,12}$")),
            confirmPassword: Joi.ref("password"),
        },
        model: "updateUsers", // Name of the model
        group: "Users", // Swagger tag for apis.
        description: "Update user and save details in database"
    }
};