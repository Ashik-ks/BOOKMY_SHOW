const mongoose = require('mongoose');

let languageSchema = new mongoose.Schema({
    language : {
        type :String,
        // required : true,
    },
})

module.exports = mongoose.model("language",languageSchema);