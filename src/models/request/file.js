const Joi = require('@hapi/joi')
module.exports = {
    // Create File
    0: {
        host: 'localhost:3000',
        basePath: '/',
        schemes: ['http'],
        group: "File",
        query: {
            limit: Joi.number().optional().default(100).description("Number of items to take"),
            page: Joi.number().optional().default(10)},
        

        paths: {
            '/v1/files/upload-single/': {
                post: {
                    summary: 'Uploads a file.',
                    description: 'Endpoint to upload a single file.',
                    consumes: ['multipart/form-data'],
                    parameters: [
                        {
                            in: 'formData',
                            name: 'file',
                            type: 'file',
                            required: true,
                            description: 'The file to upload to database.',
                        },
                    ],
                },
            },
        },

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

        model: "getAllFiles",
        group: 'File',
        description: 'Get all Files'
    },
    2: {
        path: {
            id: Joi.string().required()
        },
        model: "getFile",
        group: "File", // Swagger tag for apis.
        description: "Get File by Id"
    },
    3: {
        path: {
            id: Joi.string().required()
        },
        model: "deleteBookByID",
        group: "File", // Swagger tag for apis.
        description: "Delete book by Id"
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
        model: "editBookByID", // Name of the model
        group: "File", // Swagger tag for apis.
        description: "Update book and save details in database"

    },
    5: {
        name: "avatar",
        in: "formData",
        description: "The avatar of the user",
        required: true,
        type: "file",



        model: "handleUpload", // Name of the model
        group: "File", // Swagger tag for apis.
        description: "Create File and save details in S3"
    },
}