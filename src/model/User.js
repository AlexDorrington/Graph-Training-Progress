const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    surname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    registeredDate: {
        type: Date,
        default: Date.now()
    }
})


const User = mongoose.model('User', userSchema)


module.exports = {
    UserModel: User
}