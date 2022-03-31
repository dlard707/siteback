const {Pool} = require('pg');


const client = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://ernvrbrfngysxh:9398761c3bcbe2f2a956ddccb015dcf0db2b66caa5a871fbb0d2d7b35ff9ddb2@ec2-54-157-79-121.compute-1.amazonaws.com:5432/ddk574o5l4g0s0',
    ssl: {
        rejectUnauthorized: false
    }
})

// teste de conexão

// async function connectTeste(){

//     const res = await client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//         console.log(res.rows[0].message);
//     });

// }

// connectTeste(); 

module.exports = client