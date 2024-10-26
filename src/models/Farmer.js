// models/Farmer.js
const { ObjectId } = require('mongodb');
const database = require('../config/database');

class Farmer {
    constructor(name, age, farmName) {
        this.name = name;
        this.age = age;
        this.farmName = farmName;
    }

    // Validação de dados
    static validate(farmer) {
        if (!farmer.name || !farmer.age || !farmer.farmName) {
            throw new Error('Todos os campos são obrigatórios.');
        }
    }

    // Método para salvar um novo fazendeiro
    static async create(farmerData) {
        this.validate(farmerData);
        const db = database.getDB();
        const farmer = new Farmer(farmerData.name, farmerData.age, farmerData.farmName);
        const result = await db.collection('farmers').insertOne(farmer);
        return { id: result.insertedId, ...farmer };
    }

    // Método para encontrar todos os fazendeiros
    static async findAll() {
        const db = database.getDB();
        return await db.collection('farmers').find({}).toArray();
    }

    // Método para encontrar um fazendeiro pelo ID
    static async findById(id) {
        const db = database.getDB();
        const farmer = await db.collection('farmers').findOne({ _id: ObjectId(id) });
        if (!farmer) throw new Error('Fazendeiro não encontrado.');
        return farmer;
    }

    // Método para atualizar um fazendeiro
    static async update(id, farmerData) {
        const db = database.getDB();
        this.validate(farmerData);
        const result = await db.collection('farmers').updateOne(
            { _id: ObjectId(id) },
            { $set: farmerData }
        );
        if (result.matchedCount === 0) throw new Error('Fazendeiro não encontrado.');
        return { id, ...farmerData };
    }

    // Método para deletar um fazendeiro
    static async delete(id) {
        const db = database.getDB();
        const result = await db.collection('farmers').deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount === 0) throw new Error('Fazendeiro não encontrado.');
        return { id };
    }
}

module.exports = Farmer;
