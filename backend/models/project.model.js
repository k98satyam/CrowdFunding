const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    projectTitle: { type: String, required: true, trim: true },
    authorName: { type: String, required: true, trim: true },
    authorID: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    goal: { type: Number, required: true, trim: true },
    recived: { type: Number, required: true, trim: true },
    imageID: { type: String, required: true }
}, { timestamps : true })

const Project = mongoose.model('Project', projectSchema)
module.exports = Project