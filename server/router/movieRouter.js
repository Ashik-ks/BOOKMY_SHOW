const express = require("express");
router = express.Router();
userController = require('../movieController/controller')

router.post('/submit',userController.Addmovie);
router.get('/submit',userController.Getmovie);
router.get('/submit/:id',userController.GetSinglemovie);
router.put('/update/:id',userController.Updatemovie);
router.delete('/delete/:id',userController.Deletemovie);
router.get('/filter',userController.Moviefilter);
router.get('/categories',userController.Getcategories);
router.get('/languages',userController.Getlanguages);

module.exports = router