const mongoose = require('mongoose');

const IncludedFileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const includedFiles = mongoose.model('IncludedFiles', IncludedFileSchema);

module.exports = includedFiles;