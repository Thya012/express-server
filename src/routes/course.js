const express = require('express')
const {
    createCourse,
    getCourseById,
    getCourses,
    deleteCoursebyId,
    updateCourseById
} = require('../controller/course.js');

const requestModel = require('../models/request/course.js')
const courseRouter = express.Router();
const { validation } = require('swagger-generator-express');
const { checkRole, checkPermission } = require('../middlewares/index.js');

//courseRouter.post('/', courseSchema,handleValidation,createCourse)

courseRouter.post('/', validation(requestModel[0]),checkPermission('create_course'), createCourse)
courseRouter.get('/',validation(requestModel[1]),checkRole('admin'), getCourses)
courseRouter.get('/:id',validation(requestModel[2]), getCourseById)
courseRouter.delete('/:id',validation(requestModel[3]), deleteCoursebyId)
courseRouter.put('/:id',validation(requestModel[4]), updateCourseById)

module.exports = courseRouter