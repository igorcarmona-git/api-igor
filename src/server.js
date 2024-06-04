// working tools application
const express = require("express");
const cors = require('cors');
const APP = express();
const PORT = 3003;
const db = require('./infra/db');
const dotenv = require('dotenv');

//ROUTES imports
const loginRoute = require("./routes/loginRoute");
const userRoute = require('../src/routes/userRoute');
const profileRoute = require("./routes/profileRoute");
const reportsRoute = require("./routes/reportsRoute");
const uploadRoute = require("./routes/uploadFiles/uploadRoute");

// dotenv --> para ler arquivos .env
dotenv.config();

//tem que colocar esse db.sync() para sincronizar os dados com o banco
db.sync(); 

// forma de se fazer middlewares, quando a requisição chega, como ele trata.
APP.use(express.json()); 

// cors -->  Você está permitindo que qualquer origem (qualquer domínio) tenha acesso aos recursos da sua API. O asterisco (*) indica que não há restrições de origem, ou seja, qualquer origem pode fazer requisições para a sua API.
APP.use(cors( {origin: '*'} )); 

try{
    APP.use('/users', userRoute);
    APP.use('/login', loginRoute);
    APP.use('/profiles', profileRoute);
    APP.use('/reports', reportsRoute);
    APP.use('/uploads', uploadRoute);
    
    APP.listen(PORT, () => {
        console.log(`Running in http://localhost:${PORT}`);
        console.log('The ambient is:', process.env.NODE_ENV);
    });
}catch(error){
    return console.log(error);
}


