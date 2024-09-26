const mongoose = require('mongoose');

let shows = new mongoose.Schema({
    name: {
        type :String,
        // required : true,
    },
})

let SHOW = mongoose.model('bookmyshow',shows)
module.exports = SHOW;