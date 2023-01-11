const mongoose = require('mongoose');

const SoftwareVersionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const softwareVersion = mongoose.model('SoftwareVersion', SoftwareVersionSchema);

module.exports = softwareVersion;