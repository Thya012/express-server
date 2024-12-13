module.exports = {
  createUser: {
      201: {
          message: 'Successfully created user'
          
      },
      500: {
          internal: {
            message: 'Internal server error!'
          }
      }
  },
  getAllUsers: {
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