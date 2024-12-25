const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    permissionName: { type: String, required: true, unique: true },
    slug: { type: String },
    description: { type: String },
    createdDate: { type: Date, required: true, default: Date.now() },
});

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;
