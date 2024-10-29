// controllers/milkProductionController.js
const MilkProductionService = require('../services/MilkProduction');

class MilkProductionController {
    static async create(req, res) {
        try {
            const { farmId, date, quantity } = req.body;
            const newProduction = await MilkProductionService.createMilkProduction(farmId, date, quantity);
            res.status(201).json(newProduction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

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

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedProduction = await MilkProductionService.deleteMilkProduction(id);
            res.status(200).json(deletedProduction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

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

    static async calculateMilkPrice(req, res) {
        try {
            const { farmId } = req.params;
            const { date, distance } = req.query;

            if (!farmId || !date || !distance) {
                return res.status(400).json({ error: 'Parâmetros farmId, date e distance são necessários.' });
            }

            // Chamar o serviço para calcular o preço do leite
            const price = await MilkProductionService.calculateMilkPrice(
                farmId,
                date,
                parseFloat(distance)
            );

            // Retornar o preço calculado
            return res.status(200).json(price);
        } catch (error) {
            return res.status(500).json({ error: `Erro ao calcular o preço do leite: ${error.message}` });
        }
    }

    static async calculateYearlyMilkPrice(req, res) {
        try {
            const { farmId } = req.params;
            const { year, distance } = req.query;

            if (!farmId || !year || !distance) {
                return res.status(400).json({ error: 'Parâmetros farmId, year e distance são necessários.' });
            }

            // Chamar o serviço para calcular o preço anual
            const yearlyPrices = await MilkProductionService.calculateYearlyMilkPrice(
                farmId,
                parseInt(year),
                parseFloat(distance)
            );

            // Retornar os preços calculados para cada mês do ano
            return res.status(200).json(yearlyPrices);
        } catch (error) {
            return res.status(500).json({ error: `Erro ao calcular o preço anual do leite: ${error.message}` });
        }
    }
}

module.exports = MilkProductionController;
