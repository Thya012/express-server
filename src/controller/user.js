
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/user.js')
const Role = require('../models/role.js')
const bcrypt = require('bcrypt')
/**
 * Controller is a specific function to handle specific tasks
 */

const createUser = asyncHandler(async (req, res) => {
    
    const { firstname, lastname, email, password, confirmPassword, role } = req.body
    if (password !== confirmPassword) {
        throw new Error("Password not matched!")
    }
    const userRole = await Role.findOne({ name: role });
    if (!userRole) {
        return res.status(400).json({ message: 'Role not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const username = Date.now() + firstname

    const user = new UserModel({
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        role: userRole._id
    })

    const result = await user.save()
    //console.log(typeof (result))
    result.password = ''
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