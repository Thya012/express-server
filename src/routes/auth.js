
const express = require('express');
const { signUp, login, showGoogleOAuth, handleGoogle, exchangeJWTToUser, exchangeRefreshToken } = require('../controller/auth');
const { signUpSchema } = require('../common/validate');
const { handleValidation, verifyJWT, verifyRefresh } = require('../middlewares');
const authRouter = express.Router();

authRouter.post('/sign-up',signUpSchema,handleValidation, signUp)
authRouter.post('/login', login)
authRouter.get('/google-oauth', showGoogleOAuth)
authRouter.get('/google-callback', handleGoogle)
// authRouter.get('/facebook-oauth', handleGoogle)
authRouter.get('/me', verifyJWT, exchangeJWTToUser)
authRouter.get('/refresh', verifyRefresh, exchangeRefreshToken)

module.exports = authRouter