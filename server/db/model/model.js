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
    bgimage : {
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
    duration : {
        type : String,
        // required : true
    },
    release_date : {
        type : String,
        // required : true
    },
    description : {
        type : String,
        // required : true
    },
    cast : {
        type : String,
        // required : true
    },
    crew : {
        type : String,
        // required : true
    },
    rating : {
        type : Number,
        // required : true
    }
})

let SHOW = mongoose.model('bookmyshows',shows)
module.exports = SHOW;