const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    image:{
        type:[String],
    },
    imagePath:{
        type:[String],
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
    itemDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ItemDetails'
    },
    portfolio: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'PortFolio'
    },
    discription:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ItemDiscription'
    },
    isApproved: {
        type:Boolean,
        default:false
    },
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