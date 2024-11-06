const express = require('express')
const {
    createCourse,
    getCourseById,
    getCourses,
    deleteCoursebyId,
    updateCourseById
} = require('../controller/course.js');

const requestModel = require('../models/request/book')
const courseRouter = express.Router();
const { validation } = require('swagger-generator-express');

//courseRouter.post('/', courseSchema,handleValidation,createCourse)

courseRouter.post('/', validation(requestModel[0]), createCourse)
courseRouter.get('/', getCourses)
courseRouter.get('/:id', getCourseById)
courseRouter.delete('/:id', deleteCoursebyId)
courseRouter.put('/:id', updateCourseById)

module.exports = courseRouter