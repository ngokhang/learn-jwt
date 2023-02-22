require('dotenv').config();

const express = require('express');
const expressFileupload = require('express-fileupload');
const connection = require('./config/database');
const configViewEngine = require('./config/viewEngine');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user/user');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileupload());
configViewEngine(app);

app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);

(async () => {
    try {
        await connection();
        app.listen(process.env.PORT, () => {
            console.log(`Your app is running on ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();