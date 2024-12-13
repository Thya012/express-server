const express = require('express')
const { createBook, getBookByID, getBooks, deleteBookByID, editBookByID } = require('../controller/books.js')
const BookRouter = express.Router();


const { validation } = require('swagger-generator-express');
const requestModel = require('../models/request/book');
//const { checkRole, checkPermission } = require('../middlewares/index.js');


BookRouter.post('/', validation(requestModel[0]), createBook)
BookRouter.get('/',  validation(requestModel[1]),getBooks)
BookRouter.get('/:id', validation(requestModel[2]),getBookByID)
BookRouter.delete('/:id', validation(requestModel[3]), deleteBookByID)
BookRouter.put('/:id', validation(requestModel[4]), editBookByID)

module.exports = BookRouter