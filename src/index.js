const app = require('./app');

app.listen(process.env.API_SERVER, () => {
    console.log(`Sevidor iniciado na porta ${process.env.API_SERVER}`);
});