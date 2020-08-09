const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ImgSchema = new Schema({
    img: { 
        type: Buffer, 
    }
}, {
    timestamps: true
});
const Image = mongoose.model('image', ImgSchema)
module.exports = Image