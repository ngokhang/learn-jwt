const express = require('express');
const userController = require('../../controllers/userController');
const middlewareController = require('../../controllers/middlewareController');
const userRouter = express.Router();

userRouter.get('/', middlewareController.verifyToken, userController.getAllUser);
userRouter.delete('/:id', middlewareController.verifyTokenAndAuthAdmin, userController.deleteUserById);

module.exports = userRouter;