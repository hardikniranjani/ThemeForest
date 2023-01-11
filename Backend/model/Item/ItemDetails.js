const mongoose = require('mongoose');

const ItemDetailsSchema = new mongoose.Schema({
    Is_Gutenberg_Optimized:{
        type:Boolean,
        default:false,
    },
    Is_High_Resolution:{
        type:Boolean,
        default:false,
    },
    Is_Widget_Ready:{
        type:Boolean,
        default:false,
    },
    Compatible_Browsers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Compatable_Browser'
    },
    Files_Included:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'IncludedFiles'
    },
    Software_Version:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'SoftwareVersion'
    },
    CompatibleWith:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'CompatableWith'
    }, 
    Tags:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Tag'
    },
    Columns:{
        type:Number
    },
    IsDocumentation:{
        type:Boolean,
        default:true
    },
    Layout:{
        type:String,
    },
    LastUpdate:{
        type:Date,
    },
    Published:{
        type:Date,
    },
    isActive:{
        type:Boolean,
        default:true
    }

});

const itemDetails = mongoose.model('ItemDetails', ItemDetailsSchema);

module.exports = itemDetails;

