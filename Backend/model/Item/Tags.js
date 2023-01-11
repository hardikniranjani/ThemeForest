const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const tag = mongoose.model('Tag', TagSchema);

module.exports = tag;