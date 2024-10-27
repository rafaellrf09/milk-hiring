// services/milkProductionService.js
const { startOfMonth, getDaysInMonth } = require('date-fns');
const MilkProduction = require('../models/MilkProduction');

class MilkProductionService {
    // Método para criar uma nova produção de leite
    static async createMilkProduction(farmId, date, quantity) {
        try {
            const productionData = { farmId, date, quantity };
            const newProduction = await MilkProduction.create(productionData);
            return newProduction;
        } catch (error) {
            throw new Error(`Erro ao criar produção de leite: ${error.message}`);
        }
    }

    // Método para listar produções de leite por fazenda e data opcional
    static async getMilkProductionByFarm(farmId, date = null) {
        try {
            return await MilkProduction.findByFarmIdAndDate(farmId, date);
        } catch (error) {
            throw new Error(`Erro ao buscar produção de leite: ${error.message}`);
        }
    }

    // Método para atualizar um registro de produção de leite
    static async updateMilkProduction(id, farmId, date, quantity) {
        try {
            const productionData = { farmId, date, quantity };
            const updatedProduction = await MilkProduction.update(id, productionData);
            return updatedProduction;
        } catch (error) {
            throw new Error(`Erro ao atualizar produção de leite: ${error.message}`);
        }
    }

    // Método para deletar um registro de produção de leite
    static async deleteMilkProduction(id) {
        try {
            const deletedProduction = await MilkProduction.delete(id);
            return deletedProduction;
        } catch (error) {
            throw new Error(`Erro ao deletar produção de leite: ${error.message}`);
        }
    }

    // Método para listar produções de leite por fazenda e mês específico
    static async getMilkProductionByFarmAndMonth(farmId, month) {
        try {
            const productions = await MilkProduction.findByFarmIdAndMonth(farmId, month);

            const daysInMonth = getDaysInMonth(startOfMonth(new Date(month))); 

            const totalProduction = productions.reduce((sum, record) => sum + record.quantity, 0);
            const averageProduction = (totalProduction / daysInMonth).toFixed(3);

            return {
                totalProduction,
                averageProduction,
                daysInMonth,
                records: productions
            };
        } catch (error) {
            throw new Error(`Erro ao buscar produção de leite por mês: ${error.message}`);
        }
    }
}

module.exports = MilkProductionService;
