const app = require('./config/server');
// const noticias = require('./mockup')

//coneão com o modulo de base de dados
const db = require('./config/dbConnection');
//Definindo a porta da aplicação
const port = process.env.port || 3000;

// Criando a nossa primeira rota
app.get('/', async (req, res) => {
    //mudar res.send() para res.render()

    // Consulta SQl
    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3'); 
    //Pasando dados para o template 
    // res.render('./home/index', {noticias: noticias.slice(0, 3)});
    res.render('./home/index', {noticias: result.rows, title: 'Home'});
   
})
//Criando a nossa segunda rota noticias
app.get('/noticias', async (req, res) => {
     //mudar res.send() para res.render()
    // res.send('Todas as noticias');
    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC');
    // res.render('./noticias/noticias', {noticias: noticias});
    res.render('noticias/noticias', {noticias: result.rows, title: 'Noticias'});
})

//Criando a nossa terceira rota noticia
app.get('/noticia', async (req, res) => {
//recupera a noticia por get
    var id = req.query.id;

    let result = await db.query('SELECT * FROM noticias WHERE id_noticia = $1', [id]);

    // res.render('./noticias/noticia', {noticia: noticias[id]});

    res.render('./noticias/noticia', {noticia: result.rows[0], title: 'Noticia'});
})


//Criando a nossa quarta rota Admin
app.get('/admin', (req, res) => {
    if(req.session.autorizado){
        res.render('admin/form_add_noticia', {title: 'Admin', autorizado: req.session.autorizado});
    }else{
        res.render('./admin/login', {title: 'Login'});
    }
    // res.render('./admin/login');
})

//Rota responsável por salvar as noticias
app.post('/admin/salvar-noticia', async (req, res) => {

    let {titulo, conteudo} = req.body;

    await db.query('INSERT INTO noticias (titulo, conteudo) VALUES ($1, $2)', [titulo, conteudo], (err, result) => { res.redirect('/noticias')});
})


//Criando a nossa sexta rota responsável pela autenticação
app.post('/admin/autenticar', (req, res) => {

    const {usuario, senha} = req.body;

    if(usuario === 'root' && senha === 'cellep1234'){
        req.session.autorizado = true; 
    }
    res.redirect('/admin');
})

//Rota responsável pela saída do usuário
app.get('/admin/sair', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/admin');
    })
})



app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
    console.log('Press CTRL + C para parar o server');
})