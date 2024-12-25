const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new mongoose.Schema({
    username:{type:String},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    // gender:{type: String, required:true, default:'M'},
    dob: { type: Date},
    // phone:{type:Number, unique:true},
    // organization: { type:String, default:'MPTC'},
    // position:{type: String},
    email: { type: String, required: true, unique: true },
    createdDate: { type: Date, required: true, default: new Date() },
    password: { type: String },
    // refreshToken: { type: String },
    // type: { type: String, default: '0' },
    // role: { type: mongoose.Types.ObjectId, ref: 'Role', },
    // active: { type: Number, default:'1'}
    
})
userSchema.plugin(mongoosePaginate)
const UserModel = mongoose.model('Users', userSchema)

module.exports = UserModel