
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/user.js')

/**
 * Controller is a specific function to handle specific tasks
 */

const createUser = asyncHandler(async (req, res) => {
    
    const user = new UserModel(req.body)
    const result = await user.save()
     //clear cache
  
    return res.json(result)
      

})

const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)
    return res.json(user)
})

const getUsers = asyncHandler(async (req, res) => {
    // Get all courses 
    const { join } = req.query
    const { limit, page } = req.query
    const options = {
        limit: limit ? limit : -1,
        page: page ? page : -1,
        pagination: limit ? true : false
    }
    const user = await UserModel.paginate({},options)
    return res.json(user)
})

const deleteUserById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await UserModel.deleteOne({ _id: id })
    return res.json(result)
})

const updateUserById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await UserModel.updateOne({ _id: id }, req.body)
    return res.json(result)
})

module.exports = {
    createUser,
    getUserById,
    getUsers,
    deleteUserById,
    updateUserById
}