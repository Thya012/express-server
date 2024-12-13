const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const roleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, required: true},
    description: { type: String, required: false , index: true},
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    createdDate: { type: Date, required: true, default: Date.now() },
   
})
roleSchema.index(
    {
        description: 'text',
        title: 'text'
    }
)
roleSchema.plugin(mongoosePaginate)
const Role = mongoose.model('Role', roleSchema);
module.exports = Role;