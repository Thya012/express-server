const express = require('express')
const { handleUpload,getFile, deleteFile, handleUploads, handleS3Upload
    , handleS3Uploads, getAllFiles, 
    deleteFileS3} = require('../controller/file')
const { singleUpload, multipleUploads } = require('../middlewares')
const {uploadS3, multipleuploadS3} = require('../middlewares/uploadS3')
const fileRouter = express.Router()
//Router Mongo
fileRouter.get('/', getAllFiles)
fileRouter.delete('/:id', deleteFile)
fileRouter.post('/upload-single', singleUpload, handleUpload)
fileRouter.post('/upload-multi', multipleUploads, handleS3Uploads)
fileRouter.get('/:id', getFile)

// Router S3
fileRouter.post('/uploadS3-sigle',uploadS3, handleS3Upload)
fileRouter.post('/uploadS3-multi', multipleuploadS3,handleS3Uploads )
fileRouter.delete('/s3/:id', deleteFileS3)


module.exports = fileRouter