const mongoose = require('mongoose');

const memeschema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    caption: String,
    url: String,
    id:Number
});

module.exports = mongoose.model('Meme', memeschema);