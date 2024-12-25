const { checkSchema } = require('express-validator');
const courseSchema = checkSchema({
    price: {
        isNumeric: true,
        errorMessage : "Number only",
        isLength: {
            options: {
                mxn: 3
            }
        },
        errorMessage: "Page should be at least 3 digit"
    },
    title: {
        //isAlpha: true,
        isEmpty: false,
        errorMessage: 'Title name is text only',
    },
    author: {
        isMongoId: false,
        isEmpty: false,
        errorMessage: 'Author name is text only',
    },
})
const signUpSchema = checkSchema({
    email: {
        isEmail: true,
        errorMessage: 'Invalid email address',
    },
    lastname: {
        isAlpha: true,
        errorMessage: 'First name is text only',
    },
    firstname: {
        isAlpha: true,
        errorMessage: 'Last name is text only',
    },
    password: {
        isLength: {
            options: {
                min: 8
            }
        },
        errorMessage: "Password should be at least 8 characters"
    },
    confirmPassword: {
        custom: {
            options: async (value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("Password mistatched!")
                }
            }
        }
    }
})

module.exports = { signUpSchema, courseSchema }