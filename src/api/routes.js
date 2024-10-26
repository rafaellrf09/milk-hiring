const { Router } = require('express');

const routes = Router();

routes.route("/")
    .get((req, res) => {
        return res.json("Hello World")
    })


module.exports = routes;