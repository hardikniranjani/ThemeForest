const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    image:{
        type:String,
    },
    imagePath:{
        type:String,
    },
    videoPath:{
        type:[String],
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
    },
    salePrice:{
        type:Number,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    itemDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ItemDetails'
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author'
    },
    isApproved: {
        type:Number,
        enum:[0,1,2],
        default:0
    },
    // 0 = pending , 1 = approved, 2 = rejected
    isActive: {
        type:Boolean,
        default:true
    }
})

const item = mongoose.model('Item', ItemSchema);

module.exports = item;



// review:{
//     type:Number,
// },
// Comments:{
//     type:String,
// }
// discription:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'ItemDiscription'
// },