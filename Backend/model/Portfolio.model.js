const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    imagePath: {
        type:String
    },
    image: {
        type:String
    },
    name:{
        type:String,
        required:true,
    },
    joinDate:{
        type:String,
        required:true,
    },
    Author_Rating:{
        type:String,
        required:true,
    },
    Sales:{
        type:String,
        required:true,
    },
    Author_Level:{
        type:Number,
        default:0
    },
    Affiliate_Level:{
        type:Number,
        default:0
    },
    Collector_Level:{
        type:Number,
        default:0
    },
    MemberShip_Year:{
        type:Number,
        default:0
    },
    badges:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Badge'
    },
    items:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Item'
    },
    isActive:{
        type:Boolean,
        default:true
    }
    

});

const portFolio = mongoose.model('PortFolio', PortfolioSchema);

module.exports = portFolio;


// isMilestoneMember:{
//     type:Boolean,
//     default:false
// },
// isElightAuthor:{
//     type:Boolean,
//     default:false
// },
// isWeeklyTopSeller:{
//     type:Boolean,
//     default:false
// },
// isCopyrightNinja:{
//     type:Boolean,
//     default:false
// },
// isTrendSetter:{
//     type:Boolean,
//     default:false
// },
// isExclusive_Author:{
//     type:Boolean,
//     default:false
// },
