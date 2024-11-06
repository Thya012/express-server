const BookModel = require('../models/book')
const asyncHandler = require('express-async-handler')
const { PaginationParameters } = require('mongoose-paginate-v2')

const getBooks = asyncHandler(async (req, res)=> {
    // Get all courses 
    // const { join } = req.query
    // const { limit, page } = req.query
    // const options = {
    //     limit: limit ? limit : -1,
    //     page: page ? page : -1,
    //     pagination: limit ? true : false
    // }
    // const books = await BookModel.find(
    //     { page: { $gte: 35, $lte: 15 } })
    // return res.json(books)
    // const books = await BookModel.paginate({}, options)
    const options = new PaginationParameters(req).get()
    // console.log(...options)
    const books = await BookModel.paginate(...options)
    return res.json(books)
})
const getBookByID = asyncHandler(async (req, res)=>{
    const id = req.params.id
    const { join } = req.query
    const book = await  BookModel.findById(id).populate(join) 
        return res.json(book)
    })  

const deleteBookByID = asyncHandler(async(req, res)=>{
    const id = req.params.id
    const result = await BookModel.deleteOne({_id:id})
    return res.json(result)
})

const editBookByID = asyncHandler(async(req, res)=>{
    const id = req.params.id
    const result = await BookModel.updateOne({ ...req.body, id })
    return res.json(result)
})

const  createBook = asyncHandler(async  (req, res) => {
    const book = new BookModel(req.body)
    const result = await book.save()
      //clear cache
   
    return res.json(result)
     
})


module.exports = {createBook, getBooks, getBookByID, deleteBookByID, editBookByID }