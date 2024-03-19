const express = require("express");
const routerPerson = require('../src/routes/personRoute');
const APP = express();
const PORT = 3003;
const db = require('./infra/db');

db.sync(); //tem que colocar esse db.sync() para sincronizar os dados com o banco
APP.use(express.json()); // forma de se fazer middlewares, quando a requisição chega, como ele trata.

try{
    APP.use('/people', routerPerson);
    
    APP.listen(PORT, () => {
        console.log(`Running in http://localhost:${PORT}`);
    });
}catch(error){
    console.log(error);
}


