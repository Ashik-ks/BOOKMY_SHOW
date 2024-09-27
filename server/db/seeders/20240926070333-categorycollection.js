const category = require('../model/category');
'use strict';


module.exports = {
  up: (models, mongoose) => {
    
      return models.category.insertMany([

        {
          _id : "66f629c776fa3977a8136d60",
          category : "Thriller"
        },
        {
          _id : "66f629dc76fa3977a8136d61",
          category : "Adventure"
        },
        {
          _id : "66f62a1b76fa3977a8136d63",
          category : "Romance"
        },
        {
          _id : "66f62a4a76fa3977a8136d64",
          category : "Mystery"
        },
        {
          _id : "66f62a5b76fa3977a8136d65",
          category : "Horror"
        },
        {
          _id : "66f62a6f76fa3977a8136d66",
          category : "sci-fi"
        },
        
      ]).then(res => {
      // Prints "1"
      console.log("seeding successfull");
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    
      return models.category.deleteMany({
        _id : {
          $in : [
            "66f629c776fa3977a8136d60",
            "66f629dc76fa3977a8136d61",
            "66f62a1b76fa3977a8136d63",
            "66f62a4a76fa3977a8136d64",
            "66f62a5b76fa3977a8136d65",
            "66f62a6f76fa3977a8136d66"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log("seeder rollback successfull");
      console.log(res.deletedCount);
      });
    
  }
};