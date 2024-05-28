const userModel = require('../models/userModel');

const userExists = async (req, res, next) => {
    const username = req.body.username;

    const person = await userModel.findOne({ where: { username } });

    //Faz a conversão do retorno para True ou False, se tiver qualquer coisa dentro é True, se tiver 0, null ou undefined é False.
    const existPerson = Boolean(person); 

    if(existPerson){
        return res.status(400).send({ message: "Já existe uma pessoa cadastrada com este usuário!" });
    }

    return next();
}

const isValidEmail = (req, res, next) => {
    const email = req.body.email;

    // Expressão regular para validar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);

    if(!validEmail){
        return res.status(400).send({ message: "Email inválido. Digite um email válido!" });
    }
    return next();
}

const isValidTelefone = (req, res, next) => {
    const tel = req.body.cellphone;

    const telefoneRegex = /^\d{2}\d{5}-\d{4}$/;
    const validTel = telefoneRegex.test(tel);

    if(!validTel){
        return res.status(400).send({ message: "Telefone inválido. Digite um telefone no formato (XX)XXXXX-XXXX!" });
    }
    return next();
}

const isValidStatus = (req, res, next) => {
    const status = req.body.status;

    const allowedFields = ["ACTIVE", "active", "INACTIVE", "inactive"].includes(status);
    const validStatus = Boolean(allowedFields);

    if(!validStatus){
        return res.status(400).send({ message: "Status inválido. O status deve ser 'ACTIVE' ou 'INACTIVE'." });
    }
    return next();
}

const verifyUsernameLenght = (req, res, next) => {
    const username = req.body.username;

    if(username.includes(" ")){
        return res.status(400).send({ message: "Nome de usuário não pode conter espaços. Insira um nome de usuário sem espaços." });
    }

    if(!username){
        return res.status(400).send({ message: "Nome inválido. Insira um nome!" });
    }

    if(!username.length >= 5){
        return res.status(400).send({ message: "O nome de usuário preenchido é muito curto. Insira um nome de usuário com pelo menos 5 caracteres." });
    }
    
    return next();
}

const isValidPassword = (req, res, next) => {
    const password = req.body.password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const validPassword = passwordRegex.test(password);

    if(!validPassword){
        return res.status(400).send({ message: "Senha inválida. A senha deve ter pelo menos 8 caracteres, com pelo menos uma letra maiúscula, um caractere especial (@$!%*?&) e um número." });
    }

    return next();
}

module.exports = {userExists, isValidEmail, isValidTelefone, isValidStatus, verifyUsernameLenght, isValidPassword}