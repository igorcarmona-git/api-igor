const people = require('../models/modelPerson');

const validateCPF = (cpf) => {
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    const allDigitsSame = cpf.split('').every((char, index, array) => char === array[0]);
    if (allDigitsSame) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstVerifier = (sum * 10) % 11;
    if (firstVerifier === 10) {
        firstVerifier = 0;
    }

    // Verifica o primeiro dígito verificador
    if (parseInt(cpf.charAt(9)) !== firstVerifier) {
        return false;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondVerifier = (sum * 10) % 11;
    if (secondVerifier === 10) {
        secondVerifier = 0;
    }

    // Verifica o segundo dígito verificador
    if (parseInt(cpf.charAt(10)) !== secondVerifier) {
        return false;
    }

    // CPF válido
    return true;
}

const cpfExists = async (cpf) => {
    const cpf_format = cpf.replace(/[.-]/g, "");

    console.log(cpf);

    const person = await people.findByPk(cpf_format);

    return Boolean(person); //Faz a conversão do retorno para True ou False, se tiver qualquer dentro é True, se tiver 0, null ou undefined é False.
}

const listPeople = async (req, res) => {
    try {
        const allPeople = await people.findAll();

        if(!allPeople.length){
            return res.status(404).send({message:"Não há dados para serem retornados!"})
        }

        return res.send(allPeople);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const createPerson = async (req, res) =>{
    try{
        //sem o await ele não vai esperar a resolução dessa função por ela ser assincrona
        if(await cpfExists(req.body.cpf)){
            return res.status(402).send({message: "Já existe uma pessoa com este CPF!"})
        }

        const person = await people.create(req.body);
        return res.status(201).send(person);
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
};

const getPersonByCPF = async (req, res) => {
    const cpf = req.params.cpf;
    const cpf_format = cpf.replace(/[.-]/g, "");

    console.log(cpf_format);

    try{
        if(validateCPF(cpf_format)){
            const person = await people.findByPk(cpf);
            return res.send(person)
        }   
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = {listPeople, createPerson, getPersonByCPF}

