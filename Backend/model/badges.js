const mongoose = require('mongoose');


const badgesSchema = new mongoose.Schema({
    imagePath: {
        type:String
    },
    image: {
        type:String
    },
    name:{
        type:String,
        required:true,
    }
});


const badgesModel = new mongoose.model('Badge', badgesSchema);


module.exports = badgesModel;