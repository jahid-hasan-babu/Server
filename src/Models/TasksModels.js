const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema(
    {
        title:{type:String},
        description:{type:String},
        status:{type:String},
        email:{type:String},
    },{timestamps: true,versionKey: false})

const TaskModel = mongoose.model('tasks',TaskSchema)
module.exports = TaskModel