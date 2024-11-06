const CourseModel = require('../models/course.js')
const asyncHandler = require('express-async-handler')

/**
 * Controller is a specific function to handle specific tasks
 */

const createCourse = asyncHandler(async (req, res) => {
    //console.log(req)
    const course = new CourseModel(req.body)
    const result = await course.save()
    //clear cache
 
    return res.json(result)
})

const getCourseById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { join } = req.query
    const course = await CourseModel.findById(id).populate(join)
    return res.json(course)
})

const getCourses = asyncHandler(async (req, res) => {
  
    const { limit, page } = req.query
    const options = {
        limit: limit ? limit : -1,
        page: page ? page : -1,
        pagination: limit ? true : false
    }
    const courses = await CourseModel.paginate({},options)
    return res.json(courses)
})

const deleteCoursebyId = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await CourseModel.deleteOne({ _id: id })
    return res.json(result)
})

const updateCourseById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await CourseModel.updateOne({ _id: id }, req.body)
    return res.json(result)
})

module.exports = {
    createCourse,
    getCourseById,
    getCourses,
    deleteCoursebyId,
    updateCourseById
}