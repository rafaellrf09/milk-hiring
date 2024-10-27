// controllers/FarmerController.js
const FarmerService = require("../services/Farmer");

class FarmerController {
    // Cria um novo fazendeiro
    static async createFarmer(req, res) {
        try {
            const farmerData = req.body;
            const newFarmer = await FarmerService.createFarmer(farmerData);
            return res.status(201).json(newFarmer);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Retorna todos os fazendeiros
    static async getAllFarmers(req, res) {
        try {
            const farmers = await FarmerService.getAllFarmers();
            return res.status(200).json(farmers);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Retorna um fazendeiro pelo ID
    static async getFarmerById(req, res) {
        try {
            const { id } = req.params;
            const farmer = await FarmerService.getFarmerById(id);
            return res.status(200).json(farmer);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    // Atualiza um fazendeiro
    static async updateFarmer(req, res) {
        try {
            const { id } = req.params;
            const farmerData = req.body;
            const updatedFarmer = await FarmerService.updateFarmer(id, farmerData);
            return res.status(200).json(updatedFarmer);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Deleta um fazendeiro
    static async deleteFarmer(req, res) {
        try {
            const { id } = req.params;
            await FarmerService.deleteFarmer(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    // Retorna todas as fazendas de um fazendeiro
    static async getFarmsByFarmerId(req, res) {
        try {
            const { id } = req.params;
            const farms = await FarmerService.getFarmsByFarmerId(id);
            return res.status(200).json(farms);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = FarmerController;
