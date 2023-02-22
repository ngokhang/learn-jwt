const mongoose = require('mongoose');
const { userSchema } = require('./User');

const postSchema = mongoose.Schema({
    author: userSchema,
    authorID: mongoose.Schema.Types.ObjectId,
    title: 'string',
    content: 'string',
    timeCreate: 'string',
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
}, { timestamps: true });

const Post = mongoose.model('posts', postSchema);

module.exports = Post;