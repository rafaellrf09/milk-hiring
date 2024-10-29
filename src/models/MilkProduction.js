// models/MilkProduction.js
const { ObjectId } = require('mongodb');
const database = require('../config/database');
const { startOfMonth, endOfMonth } = require('date-fns');

class MilkProduction {
    constructor(farmId, date, quantity) {
        this.farmId = ObjectId.createFromHexString(farmId); // Referência ao id da fazenda
        this.date = new Date(date);                          // Data da produção
        this.quantity = quantity;                            // Quantidade de leite em litros
    }

    // Validação de dados
    static validate(production) {
        if (!production.farmId || !production.date || typeof production.quantity !== 'number') {
            throw new Error('Campos obrigatórios: fazenda, data e quantidade.');
        }
        if (production.quantity < 0) {
            throw new Error('Quantidade de leite não pode ser negativa.');
        }
    }

    // Método para adicionar uma nova produção de leite
    static async create(productionData) {
        this.validate(productionData);
        const db = database.getDB();
        const production = new MilkProduction(productionData.farmId, productionData.date, productionData.quantity);
        const result = await db.collection('milk_productions').insertOne(production);
        return { id: result.insertedId, ...production };
    }

    // Método para buscar produções de leite por fazenda e/ou data
    static async findByFarmIdAndDate(farmId, date = null) {
        const db = database.getDB();
        const query = { farmId: ObjectId.createFromHexString(farmId) };
        if (date) query.date = new Date(date);
        return await db.collection('milk_productions').find(query).toArray();
    }

    // Método para atualizar um registro de produção de leite
    static async update(id, productionData) {
        const db = database.getDB();
        this.validate(productionData);
        const result = await db.collection('milk_productions').updateOne(
            { _id: ObjectId(id) },
            { $set: productionData }
        );
        if (result.matchedCount === 0) throw new Error('Produção de leite não encontrada.');
        return { id, ...productionData };
    }

    // Método para deletar um registro de produção de leite
    static async delete(id) {
        const db = database.getDB();
        const result = await db.collection('milk_productions').deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount === 0) throw new Error('Produção de leite não encontrada.');
        return { id };
    }

    // Método para buscar produções de leite por fazenda e mês
    static async findByFarmIdAndMonth(farmId, date) {
        const db = database.getDB();
        const query = { farmId: ObjectId.createFromHexString(farmId) };

        const startDate = startOfMonth(new Date(date)); 
        const endDate = endOfMonth(new Date(date));       

        query.date = { $gte: startDate, $lte: endDate };

        return await db.collection('milk_productions').find(query).toArray();
    }
}

module.exports = MilkProduction;
