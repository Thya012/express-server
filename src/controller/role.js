const RoleModel = require('../models/role')
const asyncHandler = require('express-async-handler')

/**
 * Controller is a specific function to handle specific tasks
 */

const createRole = asyncHandler(async (req, res) => {
    //console.log(req)
    const role = new RoleModel(req.body)
    const result = await role.save()
    //clear cache
 
    return res.json(result)
})

const getRoleById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { join } = req.query
    const role = await RoleModel.findById(id).populate(join)
    return res.json(role)
})

const getRoles = asyncHandler(async (req, res) => {
  
    const { limit, page } = req.query
    const options = {
        limit: limit ? limit : -1,
        page: page ? page : -1,
        pagination: limit ? true : false
    }
    const roles = await RoleModel.paginate({},options)
    return res.json(roles)
})

const deleteRolebyId = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await RoleModel.deleteOne({ _id: id })
    return res.json(result)
})

const updateRoleById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await RoleModel.updateOne({ _id: id }, req.body)
    return res.json(result)
})

module.exports = {
    createRole,
    getRoleById,
    getRoles,
    deleteRolebyId,
    updateRoleById
}