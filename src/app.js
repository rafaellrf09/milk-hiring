const express = require('express');
require('dotenv').config();

const database = require('./config/database');
const routes = require('./api/routes');

// Conectar ao MongoDB
database.connect();

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(routes);
    }

    middlewares() {
        this.app.use(express.json());
    }

}

module.exports = new App().app;