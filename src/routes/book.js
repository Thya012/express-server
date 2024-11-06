const express = require('express')
const { createBook, getBookByID, getBooks, deleteBookByID, editBookByID } = require('../controller/books.js')
const BookRouter = express.Router();


const { validation } = require('swagger-generator-express');
const requestModel = require('../models/request/book')


BookRouter.post('/', validation(requestModel[0]), createBook)

BookRouter.get('/',  validation(requestModel[1]), getBooks)
BookRouter.get('/:id', getBookByID)
BookRouter.delete('/:id', deleteBookByID)
BookRouter.put('/:id', editBookByID)

module.exports = BookRouter