// models/Farm.js
const { ObjectId } = require('mongodb');
const database = require('../config/database');

class Farm {
    constructor(name, location, farmerId) {
        this.name = name;
        this.location = location;
        this.farmerId = ObjectId.createFromHexString(farmerId);  // Referência ao id do fazendeiro
    }

    // Validação de dados
    static validate(farm) {
        if (!farm.name || !farm.location || !farm.farmerId) {
            throw new Error('Todos os campos são obrigatórios.');
        }
    }

    // Método para salvar uma nova fazenda
    static async create(farmData) {
        this.validate(farmData);
        const db = database.getDB();
        const farm = new Farm(farmData.name, farmData.location, farmData.farmerId);
        const result = await db.collection('farms').insertOne(farm);
        return { id: result.insertedId, ...farm };
    }

    // Método para encontrar todas as fazendas de um fazendeiro
    static async findByFarmerId(farmerId) {
        const db = database.getDB();
        return await db.collection('farms').find({ farmerId: ObjectId.createFromHexString(farmerId) }).toArray();
    }

    // Método para atualizar uma fazenda
    static async update(id, farmData) {
        const db = database.getDB();
        this.validate(farmData);
        const result = await db.collection('farms').updateOne(
            { _id: ObjectId(id) },
            { $set: farmData }
        );
        if (result.matchedCount === 0) throw new Error('Fazenda não encontrada.');
        return { id, ...farmData };
    }

    // Método para deletar uma fazenda
    static async delete(id) {
        const db = database.getDB();
        const result = await db.collection('farms').deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount === 0) throw new Error('Fazenda não encontrada.');
        return { id };
    }
}

module.exports = Farm;
