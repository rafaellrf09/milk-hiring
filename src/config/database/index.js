const { MongoClient } = require('mongodb');
class Database {
    constructor() {
        this.client = null;
        this.db = null;
    }

    async connect() {
        const uri = process.env.MONGO_URI;

        this.client = new MongoClient(uri);

        try {
            await this.client.connect();
            this.db = this.client.db(process.env.MONGO_DB_NAME); // Use o banco de dados padrão
            console.log('MongoDB conectado com sucesso');
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
            process.exit(1);
        }
    }

    getDB() {
        if (!this.db) {
            throw new Error('Banco de dados não inicializado. Chame connect() primeiro.');
        }
        return this.db;
    }

    async close() {
        if (this.client) {
            await this.client.close();
            console.log('Conexão com o MongoDB fechada');
        }
    }
}

module.exports = new Database();