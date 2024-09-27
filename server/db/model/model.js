const mongoose = require('mongoose');

let shows = new mongoose.Schema({
    name: {
        type :String,
        // required : true,
    },
    image : {
        type :String,
        // required : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category" 
    },
    language : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "language" 
    },
})

let SHOW = mongoose.model('bookmyshow',shows)
module.exports = SHOW;