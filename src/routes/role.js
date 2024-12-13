const express = require('express')
const RoleRouter = express.Router();
const { validation } = require('swagger-generator-express');
const { createRole, getRoles, getRoleById, deleteRolebyId, updateRoleById } = require('../controller/role');




RoleRouter.post('/',  createRole)

RoleRouter.get('/',  getRoles)
RoleRouter.get('/:id', getRoleById)
RoleRouter.delete('/:id', deleteRolebyId)
RoleRouter.put('/:id', updateRoleById)

module.exports = RoleRouter