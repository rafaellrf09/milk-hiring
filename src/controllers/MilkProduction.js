// controllers/milkProductionController.js
const MilkProductionService = require('../services/MilkProduction');

class MilkProductionController {
    // Método para criar uma nova produção de leite
    static async create(req, res) {
        try {
            const { farmId, date, quantity } = req.body;
            const newProduction = await MilkProductionService.createMilkProduction(farmId, date, quantity);
            res.status(201).json(newProduction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Método para listar produções de leite por fazenda e, opcionalmente, por data
    static async getByFarmAndMonth(req, res) {
        try {
            const { farmId } = req.params;
            const { date } = req.query; // Data opcional
            const productions = await MilkProductionService.getMilkProductionByFarmAndMonth(farmId, date);
            res.status(200).json(productions);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Método para atualizar um registro de produção de leite
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { farmId, date, quantity } = req.body;
            const updatedProduction = await MilkProductionService.updateMilkProduction(id, farmId, date, quantity);
            res.status(200).json(updatedProduction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Método para deletar um registro de produção de leite
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedProduction = await MilkProductionService.deleteMilkProduction(id);
            res.status(200).json(deletedProduction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Método para listar produções de leite por fazenda e, opcionalmente, por data
    static async getByFarm(req, res) {
        try {
            const { farmId } = req.params;
            const { date } = req.query; // Data opcional
            const productions = await MilkProductionService.getMilkProductionByFarm(farmId, date);
            res.status(200).json(productions);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = MilkProductionController;
