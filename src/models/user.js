const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    createdDate: { type: Date, required: true, default: Date.now() },
    password: { type: String, },
    refreshToken: { type: String},
    userSSO: {type: String, default:"0"}
    
})
userSchema.plugin(mongoosePaginate)
const UserModel = mongoose.model('Users', userSchema)

module.exports = UserModel