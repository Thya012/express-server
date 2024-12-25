const Permission = require('../models/permission')
const asyncHandler = require('express-async-handler')

/**
 * Controller is a specific function to handle specific tasks
 */

const createPermission = asyncHandler(async (req, res) => {
    //console.log(req)
    const permission = new Permission(req.body)
    const result = await permission.save()
    //clear cache
 
    return res.json(result)
})

const getPermissionById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { join } = req.query
    const permission = await Permission.findById(id).populate(join)
    return res.json(permission)
})

const getPermissions = asyncHandler(async (req, res) => {
  
    const { limit, page } = req.query
    const options = {
        limit: limit ? limit : -1,
        page: page ? page : -1,
        pagination: limit ? true : false
    }
    const permissions = await Permission.paginate({},options)
    return res.json(permissions)
})

const deletePermissionById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await Permission.deleteOne({ _id: id })
    return res.json(result)
})

const updatePermissionById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await Permission.updateOne({ _id: id }, req.body)
    return res.json(result)
})

module.exports = {
    createPermission,
    getPermissionById,
    getPermissions,
    deletePermissionById,
    updatePermissionById
}