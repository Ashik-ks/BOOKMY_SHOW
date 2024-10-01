
const fs = require('fs');
const path = require('path');


exports.fileDelete = async function(filePath) {
    console.log("filePath : ",filePath);
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting the image:', err);
        return reject(err); // Reject the promise with the error
      }
      console.log('Image deleted successfully');
      resolve(); // Resolve the promise
    });
  });
};