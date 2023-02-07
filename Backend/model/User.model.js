const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    imagePath: {
        type:String
    },
    image: {
        type:String
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['male', 'female'],
        required:true,
    },
    role:{
        type:String,
        enum:['admin', 'user','author'],
        default:'user',
    },
    isAuthor:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const user = mongoose.model('User', UserSchema);

module.exports = user;