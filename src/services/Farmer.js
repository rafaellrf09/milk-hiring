// services/FarmerService.js
const Farmer = require('../models/Farmer');
const Farm = require('../models/Farm');

class FarmerService {
    static async createFarmer(farmerData) {
        try {
            return await Farmer.create(farmerData);
        } catch (error) {
            throw new Error(`Erro ao criar fazendeiro: ${error.message}`);
        }
    }

    static async getAllFarmers() {
        try {
            return await Farmer.findAll();
        } catch (error) {
            throw new Error(`Erro ao buscar fazendeiros: ${error.message}`);
        }
    }

    static async getFarmerById(id) {
        try {
            return await Farmer.findById(id);
        } catch (error) {
            throw new Error(`Erro ao buscar fazendeiro com ID ${id}: ${error.message}`);
        }
    }

    static async updateFarmer(id, farmerData) {
        try {
            return await Farmer.update(id, farmerData);
        } catch (error) {
            throw new Error(`Erro ao atualizar fazendeiro com ID ${id}: ${error.message}`);
        }
    }

    static async deleteFarmer(id) {
        try {
            return await Farmer.delete(id);
        } catch (error) {
            throw new Error(`Erro ao deletar fazendeiro com ID ${id}: ${error.message}`);
        }
    }

    static async getFarmsByFarmerId(farmerId) {
        try {
            return await Farm.findByFarmerId(farmerId);
        } catch (error) {
            throw new Error(`Erro ao buscar fazendas para o fazendeiro com ID ${farmerId}: ${error.message}`);
        }
    }
}

module.exports = FarmerService;
