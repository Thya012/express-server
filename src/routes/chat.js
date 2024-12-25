const express = require('express');
const { getChats } = require('../controller/chat');

const ChatRouter = express.Router();


ChatRouter.get('/', getChats)


module.exports = ChatRouter