// services/milkProductionService.js
const { startOfMonth, getDaysInMonth, getMonth } = require('date-fns');
const MilkProduction = require('../models/MilkProduction');
const currencyConverter = require('../utils/currencyConverter');

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
    static async getMilkProductionByFarmAndMonth(farmId, date) {
        try {
            const productions = await MilkProduction.findByFarmIdAndMonth(farmId, date);

            const daysInMonth = getDaysInMonth(startOfMonth(new Date(date)));

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

    // Método para obter critérios de precificação com base no mês
    static getPricingCriteria(date, distance, totalProduction) {
        // Determinar o semestre com base no mês (0 = janeiro, ..., 11 = dezembro)
        const month = getMonth(date);
        const isFirstSemester = month >= 0 && month <= 5;

        // Preço base por litro
        const precoBase = isFirstSemester ? 1.80 : 1.95;

        // Custo por KM (baseado na distância)
        const custoPorKm = distance <= 50 ? 0.05 : 0.06;

        // Bônus por produção (só se aplicável)
        const bonusPorProducao = (totalProduction > 10000 && !isFirstSemester) ? 0.01 : 0.00;

        return { precoBase, custoPorKm, bonusPorProducao };
    }

    // Método para calcular o preço pago ao fazendeiro com base no volume do mês
    static async calculateMilkPrice(farmId, date, distance) {
        try {
            // Obter produções de leite para o mês especificado
            const { totalProduction } = await MilkProductionService.getMilkProductionByFarmAndMonth(farmId, date);

            // Obter os critérios de precificação com base no mês e distância
            const { precoBase, custoPorKm, bonusPorProducao } = this.getPricingCriteria(date, distance, totalProduction);

            const daysInMonth = getDaysInMonth(startOfMonth(new Date(date)));

            // Calcular o preço final com base na fórmula fornecida
            const precoFinal = ((totalProduction * precoBase) - (custoPorKm * distance) + (bonusPorProducao * totalProduction)) / daysInMonth;

            // Retornar o valor formatado em português e inglês
            const precoUSD = await currencyConverter(precoFinal);
            return {
                precoBRL: precoFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                precoUSD: precoUSD.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            };
        } catch (error) {
            throw new Error(`Erro ao calcular o preço do leite: ${error.message}`);
        }
    }

    // Método para calcular o preço pago ao fazendeiro para cada mês do ano
    static async calculateYearlyMilkPrice(farmId, year, distance) {
        try {
            const monthlyPrices = [];

            for (let month = 0; month < 12; month++) {
                // Obter o primeiro dia do mês para compor a data
                const date = new Date(year, month, 1);
                let precoFinal = 0, precoUSD = 0;

                // Obter produções de leite para o mês especificado
                const { totalProduction } = await MilkProductionService.getMilkProductionByFarmAndMonth(farmId, date);

                if (totalProduction > 0) {
                    const { precoBase, custoPorKm, bonusPorProducao } = this.getPricingCriteria(date, distance, totalProduction);
                    precoFinal = (totalProduction * precoBase) - (custoPorKm * distance) + (bonusPorProducao * totalProduction);
                    precoUSD = await currencyConverter(precoFinal);
                }
                monthlyPrices.push({
                    month: month + 1,  // Ajuste para 1 a 12
                    precoBRL: precoFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    precoUSD: precoUSD.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
                });
            }

            return monthlyPrices;
        } catch (error) {
            throw new Error(`Erro ao calcular o preço anual do leite: ${error.message}`);
        }
    }

}

module.exports = MilkProductionService;
