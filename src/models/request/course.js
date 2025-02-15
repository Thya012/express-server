const Joi = require('@hapi/joi')
module.exports = {
    // createCourse
    0: {
        body: {
            title: Joi.string().required(),
            category: Joi.string().required(),
            populate: Joi.string().optional(),
            
            author: Joi.string().required(),
            price: Joi.number().required(),
        },
        model: "createCourse", // Name of the model
        group: "Coures", // Swagger tag for apis.
        description: "Create Course and save details in database"
    },
    1: {
        query: {
            limit: Joi.number().optional().default(100).description("Number of items to take"),
            page: Joi.number().optional().default(10),
            sort: Joi.string().optional(),
            query: Joi.string().optional(),
            populate: Joi.string().optional(),
            select: Joi.string().optional()
        },
        model: "getCourses",
        group: 'Coures',
        description: 'Get all courses'
    },
    2: {
        path: {
            id: Joi.string().required()
        },
        model: "getCourseById",
        group: "Coures", // Swagger tag for apis.
        description: "Get Coures by Id"
    },
    3: {
        path: {
            id: Joi.string().required()
        },
        model: "deleteCoursebyId",
        group: "Coures", // Swagger tag for apis.
        description: "Delete Coures by Id"
    },
    4: {
        path: {
            id: Joi.string().required()
        },
        body: {
            title: Joi.string().optional(),
            genre: Joi.string().optional(),
            description: Joi.string().optional(),
            author: Joi.string().optional(),
            page: Joi.number().optional(),
        },
        model: "updateCourseById", // Name of the model
        group: "Coures", // Swagger tag for apis.
        description: "Update Coures and save details in database"
    }
}