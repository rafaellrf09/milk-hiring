// controllers/FarmController.js
const FarmService = require('../services/Farm');

class FarmController {
    // Cria uma nova fazenda
    static async createFarm(req, res) {
        try {
            const farmData = req.body;
            const newFarm = await FarmService.createFarm(farmData);
            return res.status(201).json(newFarm);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Retorna todas as fazendas
    static async getAllFarms(req, res) {
        try {
            const farms = await FarmService.getAllFarms();
            return res.status(200).json(farms);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Retorna uma fazenda pelo ID
    static async getFarmById(req, res) {
        try {
            const { id } = req.params;
            const farm = await FarmService.getFarmById(id);
            return res.status(200).json(farm);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    // Atualiza uma fazenda
    static async updateFarm(req, res) {
        try {
            const { id } = req.params;
            const farmData = req.body;
            const updatedFarm = await FarmService.updateFarm(id, farmData);
            return res.status(200).json(updatedFarm);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Deleta uma fazenda
    static async deleteFarm(req, res) {
        try {
            const { id } = req.params;
            await FarmService.deleteFarm(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = FarmController;
