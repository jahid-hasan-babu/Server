const mongoose = require('mongoose')


const DataSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        userName: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        city: {
            type: String,
            trim: true,
        },
    },
    {timestamps: true, versionKey:false})


const userModel = mongoose.model('users',DataSchema);
module.exports = userModel