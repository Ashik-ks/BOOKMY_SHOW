const express = require("express");
router = express.Router();
userController = require('../movieController/controller')

router.post('/submit',userController.Addmovie);
router.get('/submit',userController.Getmovie);
router.get('/submit/:id',userController.GetSinglemovie);
router.put('/update/:id',userController.Updatemovie);
router.delete('/delete/:id',userController.Deletemovie);
router.get('/moviecategory/:filter',userController.Moviefilter);

module.exports = router