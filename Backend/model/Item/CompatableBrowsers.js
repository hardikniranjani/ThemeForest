const mongoose = require('mongoose');

const BrowserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const browser = mongoose.model('Compatable_Browser', BrowserSchema);

module.exports = browser;