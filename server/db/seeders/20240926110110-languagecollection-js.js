const language = require('../model/language');
'use strict';


module.exports = {
  up: (models, mongoose) => {
    
      return models.language.insertMany([

        {
          _id : "66f53f82d8ae300038b4e8b5",
          language : "Malayalam"
        },
        {
          _id : "66f53f97d8ae300038b4e8b6",
          language : "English"
        },
        {
          _id : "66f53fa8d8ae300038b4e8b7",
          language : "Tamil"
        },
        {
          _id : "66f53fbbd8ae300038b4e8b8",
          language : "Hindi"
        },
        {
          _id : "66f53fd0d8ae300038b4e8b9",
          language : "Telugu"
        },

      ]).then(res => {
      // Prints "1"
      console.log("seeding successfull");
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    
      return models.language.deleteMany({
        _id : {
          $in : [
            "66f53f82d8ae300038b4e8b5",
            "66f53f97d8ae300038b4e8b6",
            "66f53fa8d8ae300038b4e8b7",
            "66f53fbbd8ae300038b4e8b8",
            "66f53fd0d8ae300038b4e8b9"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log("seeder rollback successfull");
      console.log(res.deletedCount);
      });
    
  }
};