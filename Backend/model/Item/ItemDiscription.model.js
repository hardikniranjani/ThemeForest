const mongoose = require('mongoose');

const ItemDiscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const itemDiscription = mongoose.model('ItemDiscription', ItemDiscriptionSchema);

module.exports = itemDiscription;