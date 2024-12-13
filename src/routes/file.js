const express = require('express')
const { handleUpload, deleteFile, handleUploads, handleS3Upload
    , handleS3Uploads, getAllFiles, 
    deleteFileS3,
    getFilebyID} = require('../controller/file')
const { singleUpload, multipleUploads } = require('../middlewares')
const {uploadS3, multipleuploadS3} = require('../middlewares/uploadS3')
const fileRouter = express.Router()
const { validation } = require('swagger-generator-express');
//const requestModel = require('../models/request/file')
//Router Mongo

fileRouter.post('/upload-single', singleUpload, handleUpload)
fileRouter.get('/', getAllFiles)
fileRouter.get('/:id', getFilebyID)
fileRouter.delete('/:id', deleteFile)
fileRouter.post('/upload-multi', multipleUploads, handleS3Uploads)


// Router S3
fileRouter.post('/uploadS3-sigle',uploadS3, handleS3Upload)
fileRouter.post('/uploadS3-multi', multipleuploadS3,handleS3Uploads )
fileRouter.delete('/s3/:id', deleteFileS3)


module.exports = fileRouter