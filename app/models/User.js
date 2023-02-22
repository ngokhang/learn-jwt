const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const userSchema = mongoose.Schema({
    fullName: 'string',
    account: 'string',
    password: 'string',
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
    role: 'string',
}, { timestamps: true });

userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const User = mongoose.model('users', userSchema);

module.exports = { User, userSchema };