const express = require('express');
const path = require('path');

const configViewEngine = (app) => {
    app.set('views', path.join('./app', 'views'));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join('./app', 'public')));
}

module.exports = configViewEngine;