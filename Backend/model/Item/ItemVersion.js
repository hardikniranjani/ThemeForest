const mongoose = require('mongoose');

const ItemVersionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const itemVersion = mongoose.model('ItemVersion', ItemVersionSchema);

module.exports = itemVersion;