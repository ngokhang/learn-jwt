const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

let refreshTokens = [];
const authController = {
    resgisterController: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await User.create({
                fullName: req.body.fullName,
                account: req.body.account,
                password: hashed,
                posts: [],
                role: 'user'
            });

            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    generateAccessToken: (user) => {
        return jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1d' });
    },
    generateRefreshToken: (user) => {
        return jwt.sign({ id: user.id, role: user.role }, 'keyRefresh', { expiresIn: '30d' });
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ account: req.body.account });
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);

            if (!user) {
                res.status(404).json("Username is not valid");
            }
            if (!isValidPassword) {
                res.status(404).json("Password is wrong");
            }
            if (user && isValidPassword) {
                const accessToken = authController.generateAccessToken(user)

                const refreshToken = authController.generateRefreshToken(user);

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict'
                });
                refreshTokens.push(refreshToken);

                res.status(200).json({ user, accessToken, refreshToken });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, 'keyRefresh', function (err, user) {
            if (err) return res.json(err);
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            });
            return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        })
    },

    logOut: async (req, res) => {
        res.clearCookie("refreshToken");
        res.status(200).json("Logout sucessful");
    }
};

module.exports = authController;