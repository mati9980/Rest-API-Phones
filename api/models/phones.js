const mongoose = require("mongoose");

const phoneSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    comments: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
    ],
    name: String,
    model: String,
    cpu: String,
    ram: Number,
});

module.exports = mongoose.model("phone", phoneSchema);