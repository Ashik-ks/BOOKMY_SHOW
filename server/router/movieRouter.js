const express = require("express");
router = express.Router();
userController = require('../movieController/controller')

router.post('/movies',userController.Addmovie);
router.get('/movies',userController.Getmovie);
router.get('/movie/:id',userController.GetSinglemovie);
router.put('/movies/:id',userController.Updatemovie);
router.delete('/movies/:id',userController.Deletemovie);
router.get('/categories',userController.Getcategories);
router.get('/languages',userController.Getlanguages);

module.exports = router