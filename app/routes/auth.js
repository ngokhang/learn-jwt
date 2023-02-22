const express = require('express');
const authController = require('../controllers/authController');
const middlewareController = require('../controllers/middlewareController');
const authRoute = express.Router();

authRoute.post('/register', authController.resgisterController);
authRoute.post('/login', authController.loginUser);
authRoute.post('/refresh', authController.requestRefreshToken);
authRoute.post('/logout', middlewareController.verifyToken, authController.logOut);

module.exports = authRoute;