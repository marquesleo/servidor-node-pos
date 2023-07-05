require('dotenv').config();//le env

// Importa o módulo do Express Framework
const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');
// Inicializa um objeto de aplicação Express
const app = express();
// Cria um manipulador da rota padrão
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(morgan('common'));
app.set('view engine','ejs');
app.use('/api/v1/usuario',require('./routes/usuarioAPI'));
app.use('/api/v1/prioridades',require('./routes/prioridadeAPI'));

app.use((req,res) => {
    res.status(404).send("Página não encontrada")
});

// Inicializa o servidor HTTP na porta 3000
app.listen (3000, function () {
    console.log ('Servidor rodando na porta 3000')

});