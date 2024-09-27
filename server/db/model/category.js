const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    category : {
        type :String,
        // required : true,
    },
})

module.exports = mongoose.model("category",categorySchema);