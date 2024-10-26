const { Router } = require('express');
const Farmer = require('../models/Farmer');

const routes = Router();

routes.route("/")
    .get((req, res) => {
        return res.json("Hello World")
    })

routes.route("/farmer")
    .post(async (req, res) => {
        try {
            const farmer = await Farmer.create(req.body);
            res.status(201).send(farmer);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    })


module.exports = routes;