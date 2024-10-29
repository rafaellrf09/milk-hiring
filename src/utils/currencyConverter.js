const axios = require('axios');
async function currencyConverter(valorBRL) {
    try {
        const url = 'https://api.exchangerate-api.com/v4/latest/BRL';
        const response = await axios.get(url);

        const taxaCambio = response.data.rates.USD;
        const valorUSD = valorBRL * taxaCambio;
        return valorUSD;
    } catch (error) {
        console.error("Erro ao obter a taxa de câmbio:", error);
        return null;
    }
}

module.exports = currencyConverter;
