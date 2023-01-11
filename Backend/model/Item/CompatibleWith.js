const mongoose = require('mongoose');

const CompatableWithSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const compatableWith = mongoose.model('CompatableWith', CompatableWithSchema);

module.exports = compatableWith;