require('dotenv').config();

const mongoose = require('mongoose');
const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
};

const connection = async () => {
    await mongoose.connect(process.env.MONGO_URI, options)
        .then(() => console.log('DB Connected'));
};

module.exports = connection;