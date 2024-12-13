module.exports = {
    createCourse: {
        201: {
            message: 'Successfully created book'
            
        },
        500: {
            internal: {
                message: 'Internal server error!'
            }
        }
    },
    getAllCourse: {
        200: {
            docs: {
                type: 'array',
                items: {
                    type: 'object'
                }
            },
            totalDocs: {
                type: 'number'
            },
            limit: {
                type: 'number'
            },
            totalPages: {
                type: 'number'
            },
            page: {
                type: 'number'
            },
            pagingCounter: {
                type: 'number'
            },
            hasPrevPage: {
                type: 'boolean'
            },
            hasNextPage: {
                type: 'boolean'
            },
            prevPage: {
                type: 'string'
            },
            nextPage: {
                type: 'string'
            }
        }
    }
};