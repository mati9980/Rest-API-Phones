const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    phone: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Phone'
    },
    title: String,
    userName: String,
    content: String
});

module.exports = mongoose.model("Comment", commentSchema);