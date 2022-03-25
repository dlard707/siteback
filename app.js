// Importação Express
const express = require('express');
const noticias = require('./mockup')

// criando um objeto na variável app
const app = express();
//Configurando EJS
app.set('view engine', 'ejs');
//Acrescentando o diretório public (arquivos estáticos)
app.use(express.static('public'));

// Criando a nossa primeira rota
app.get('/', (req, res) => {
    //mudar res.send() para res.render()
    res.render('./home/index', {noticias: noticias.slice(0, 3)});
   
})
//Criando a nossa segunda rota
app.get('/noticias', (req, res) => {
     //mudar res.send() para res.render()
    res.send('Todas as noticias');
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    console.log('Press CTRL + C para parar o server');
})