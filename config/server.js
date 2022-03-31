// Importação Express
const express = require('express');
const session = require('express-session');


// criando um objeto na variável app
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configurando EJS
app.set('view engine', 'ejs');
//definido o camnihp das views EJS
app.set('views', './app/views');
//Acrescentando o diretório public (arquivos estáticos)
app.use(express.static('./app/public'));

//Criando a nossa quinta rota Session
app.use(session({
    secret: '2*V9vM#@;tcrtZ.c',
    resave: false,
    saveUninitialized: false
}))

module.exports = app;