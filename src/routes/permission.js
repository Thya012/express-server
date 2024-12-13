const express = require('express')
const PermissionRouter = express.Router();
const { validation } = require('swagger-generator-express');
const { createPermission, getPermissions, getPermissionById, deletePermissionById, updatePermissionById } = require('../controller/permission');




PermissionRouter.post('/',  createPermission)

PermissionRouter.get('/',  getPermissions)
PermissionRouter.get('/:id', getPermissionById)
PermissionRouter.delete('/:id', deletePermissionById)
PermissionRouter.put('/:id', updatePermissionById)

module.exports = PermissionRouter