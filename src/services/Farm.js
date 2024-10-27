// services/FarmService.js
const Farm = require('../models/Farm');

class FarmService {
    static async createFarm(farmData) {
        try {
            return await Farm.create(farmData);
        } catch (error) {
            throw new Error(`Erro ao criar fazenda: ${error.message}`);
        }
    }

    static async getAllFarms() {
        try {
            return await Farm.findAll();
        } catch (error) {
            throw new Error(`Erro ao buscar fazendas: ${error.message}`);
        }
    }

    static async getFarmById(id) {
        try {
            return await Farm.findById(id);
        } catch (error) {
            throw new Error(`Erro ao buscar fazenda com ID ${id}: ${error.message}`);
        }
    }

    static async updateFarm(id, farmData) {
        try {
            return await Farm.update(id, farmData);
        } catch (error) {
            throw new Error(`Erro ao atualizar fazenda com ID ${id}: ${error.message}`);
        }
    }

    static async deleteFarm(id) {
        try {
            return await Farm.delete(id);
        } catch (error) {
            throw new Error(`Erro ao deletar fazenda com ID ${id}: ${error.message}`);
        }
    }
}

module.exports = FarmService;
