const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    imagePath: {
        type:String
    },
    image: {
        type:String
    },
    username:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
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
        default:'author',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    followers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Author',
    },
    following:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Author',
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const author = mongoose.model('Author', AuthorSchema);

module.exports = author;



// portFolio:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'PortFolio',
// },