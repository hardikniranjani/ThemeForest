const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    imagePath:{
        type: String,
    },
    image:{
        type: String,
    },
    name:{
        type: String,
        required: true
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    isLeaf:{
        type:Boolean,
        default:true
    },
    isActive:{
        type:Boolean,
        default:true,
    }
});

const category = mongoose.model('Category',CategorySchema);

module.exports = category;