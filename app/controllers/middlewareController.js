const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, 'secretKey', function (err, user) {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            })
        } else {
            return res.status(403).json("You're not authenticatied");
        }
    },
    verifyTokenAndAuthAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.role === 'admin') {
                next();
            } else {
                return res.status(403).json("You're not allowed to delele this user");
            }
        })
    }
};

module.exports = middlewareController;