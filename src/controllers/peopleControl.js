const people = require('../models/personModel');

const validateCPF = (cpf) => {
    console.log("dentro do " + cpf)

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        console.log("passei o nao igual 11")
        return false;
    }

    // Verifica se todos os dígitos são iguais
    const allDigitsSame = cpf.split('').every((char, index, array) => char === array[0]);
    if (allDigitsSame) {
        console.log("passei alldigits same")
        return false;
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        console.log("dentro do for 1")
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstVerifier = (sum * 10) % 11;
    if (firstVerifier === 10) {
        console.log("passei o 10")
        firstVerifier = 0;
    }

    // Verifica o primeiro dígito verificador
    if (parseInt(cpf.charAt(9)) !== firstVerifier) {
        console.log("passei o 9")
        return false;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        console.log("dentro do for 2")
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondVerifier = (sum * 10) % 11;
    if (secondVerifier === 10) {
        console.log("passei o 11")
        secondVerifier = 0;
    }

    // Verifica o segundo dígito verificador
    if (parseInt(cpf.charAt(10)) !== secondVerifier) {
        console.log("passei o second verifier")
        return false;
    }

    // CPF válido
    console.log("passei o cpf")
    return true;
}

const listPeople = async (req, res) => {
    try {
        const allPeople = await people.findAll();

        if(!allPeople.length){
            return res.status(404).send({ message: "Não há dados para serem retornados!"})
        }

        return res.status(200).send(allPeople);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro ao buscar dados de pessoas!" });
    }
};

const getPersonByCPF = async (req, res) => {
    const cpf = req.params.cpf;

    try{
        if(validateCPF(cpf)){
            const person = await people.findByPk(cpf);

            if(person)
                return res.status(200).send(person)

            return res.status(404).send({ message: "Não consta registros deste CPF em nosso banco de dados!" })
        }   
    }catch(error){
        return res.status(500).send({ message: "Ocorreu um erro ao buscar dados deste CPF!" });
    }
}

const createPerson = async (req, res) => {
    // Extrai os dados da requisição
    const { nome, email, telefone, nascimento, cpf, status } = req.body;

    // Verifique se todos os campos obrigatórios estão presentes
    if (!nome || !email || !telefone || !nascimento || !cpf || !status) {
        return res.status(400).send({ message: "Todos os campos são obrigatórios!" });
    }

    try {
        if (!validateCPF(cpf)) 
            return res.status(400).send({ message: "CPF inválido. Digite um CPF válido!" });

        console.log("passei antes do newREQ")
        const newReq = { nome, email, telefone, nascimento, cpf, status };
        console.log(newReq)
        const person = await people.create(newReq);

        return res.status(201).send(person);
    } catch (error) {
        return res.status(500).send({ message: "Ocorreu um erro ao adicionar dados!" });
    }
};

const editPersonByCPF = async (req, res) => {
    const { nome, email, telefone, nascimento, cpf, status } = req.body;

    try {
        if (!validateCPF(cpf))
            return res.status(400).send({ message: "CPF inválido. Digite um CPF válido!" });

        const existsPerson = await people.findByPk(cpf);
        
        if (!existsPerson)
            return res.status(404).send({ message: "A pessoa com este CPF não foi encontrada." });

        const dataPerson = existsPerson;
    
        // Atualiza os dados da pessoa
        dataPerson.nome = nome;
        dataPerson.email = email;
        dataPerson.telefone = telefone;
        dataPerson.nascimento = nascimento;
        dataPerson.cpf = cpf;
        dataPerson.status = status;

        // Salva as alterações no banco de dados
        const updatedPerson = await dataPerson.save();
        return res.status(200).send(updatedPerson);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro ao editar os dados da pessoa!" });
    }
};

const deletePersonByCPF = async (req, res) => {
    const cpf = req.params.cpf
    const cpf_format = cpf.replace(/[.-]/g, "");

    try{
        if(validateCPF(cpf_format)){
            const person = await people.destroy({ where: { cpf: cpf_format } });
            return res.status(200).send({message: "Foi realizada a exclusão da pessoa em nosso sistema!"})
        }   
    }catch(error){
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro ao realizar exclusão de dados no sistema!" });
    }
}   

module.exports = {listPeople, createPerson, getPersonByCPF, deletePersonByCPF, editPersonByCPF}

