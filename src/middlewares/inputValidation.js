const people = require('../models/personModel');

const cpfExists = async (req, res, next) => {
    const cpf = req.body.cpf;

    const person = await people.findByPk(cpf);

    //Faz a conversão do retorno para True ou False, se tiver qualquer coisa dentro é True, se tiver 0, null ou undefined é False.
    const existPerson = Boolean(person); 

    if(existPerson){
        return res.status(400).send({ message: "Já existe uma pessoa cadastrada com este CPF!" });
    }

    return next();
}

const formatCPF = (req, res, next) => {
    const cpf = req.body.cpf;

    const cpf_format = cpf.replace(/[.-]/g, "");
    req.body.cpf = cpf_format;

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
    const tel = req.body.telefone;

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

const formatDATE = (req, res, next) => {
    const date = req.body.nascimento;
    
    const nascimentoFormatted = new Date(date).toISOString().split('T')[0]; //Formata a data de nascimento para o formato "YYYY-MM-DD"

    if(nascimentoFormatted){
        req.body.nascimento = nascimentoFormatted;
        return next();
    }

    return res.status(400).send({ message: "Data de nascimento inválido. Digite uma data no formato 'YYYY-MM-DD'!" });
}

const upperCase = (req, res, next) => {
    const { nome, status } = req.body;

    const nomeFormatted = nome.toUpperCase();
    const statusFormatted = status.toUpperCase();

    if(nomeFormatted && statusFormatted){
        req.body.nome = nomeFormatted;
        req.body.status = statusFormatted;
        return next();
    }

    return res.status(400).send({ message: "Nome ou status inválido. Insira um nome e um status!" });
}

const verifyNameLenght = (req, res, next) => {
    const nome = req.body.nome;

    if(!nome){
        return res.status(400).send({ message: "Nome inválido. Insira um nome!" });
    }

    if(!nome.length >= 15){
        return res.status(400).send({ message: "O nome preenchido é muito curto. Insira um nome completo." });
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

module.exports = {cpfExists, isValidEmail, isValidTelefone, isValidStatus, formatDATE, upperCase, verifyNameLenght, formatCPF, isValidPassword}