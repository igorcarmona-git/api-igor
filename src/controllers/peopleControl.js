const people = require('../models/modelPerson');

//Validation functions
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
    const person = await people.findByPk(cpf_format);

    //Faz a conversão do retorno para True ou False, se tiver qualquer coisa dentro é True, se tiver 0, null ou undefined é False.
    return Boolean(person); 
}

const formatDATE = (date) => {
    const nascimentoFormatted = new Date(date).toISOString().split('T')[0]; //Formata a data de nascimento para o formato "YYYY-MM-DD"
    return nascimentoFormatted;
}

const isValidEmail = (email) => {
    // Expressão regular para validar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const isValidTelefone = (tel) => {
    const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
    return telefoneRegex.test(tel);
}

const isValidStatus = (status) => {
    const allowedFields = ["ACTIVE", "active", "INACTIVE", "inactive"].includes(status);
    return Boolean(allowedFields);
}

const upperCase = (nome, status) => {
    const nomeFormatted = nome.toUpperCase();
    const statusFormatted = status.toUpperCase();

    return {
        nomeFormatted,
        statusFormatted
    }
}

// Middlewares
const allowedFields = (req, res, next) => {
    // Verifique se há campos não permitidos na requisição
    const allowedFields = ["nome", "email", "telefone", "nascimento", "cpf", "status"];
    const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field)); //retorna uma lista de campos na solicitação da requisição não permitidos

    if (extraFields.length > 0) {
        return res.status(400).send({ message: `Campos não permitidos: ${extraFields.join(", ")}` });
    }

    next(); // Chame o próximo middleware na cadeia de middleware
}

// -----------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

const listPeople = async (req, res) => {
    try {
        const allPeople = await people.findAll();

        if(!allPeople.length){
            return res.status(404).send({message:"Não há dados para serem retornados!"})
        }

        return res.status(200).send(allPeople);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro ao buscar dados de pessoas!" });
    }
};

const getPersonByCPF = async (req, res) => {
    const cpf = req.params.cpf;
    const cpf_format = cpf.replace(/[.-]/g, "");

    try{
        if(validateCPF(cpf_format)){
            const person = await people.findByPk(cpf_format);

            if(person)
                return res.status(200).send(person)

            return res.status(404).send({ message: "Não consta registros deste CPF em nosso banco de dados!" })
        }   
    }catch(error){
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro ao buscar dados deste CPF!" });
    }
}

const createPerson = async (req, res) => {
    console.log(`Estou dentro do CreatePerson... ${req.body}`);
    // Extrai os dados da requisição
    const { nome, email, telefone, nascimento, cpf, status } = req.body;

    const nascimentoFormatted = formatDATE(nascimento);
    const cpf_format = cpf.replace(/[.-]/g, "");
    const {nomeFormatted, statusFormatted } = upperCase(nome, status);

    // Verifique se todos os campos obrigatórios estão presentes
    if (!nome || !email || !telefone || !nascimento || !cpf || !status) {
        return res.status(400).send({ message: "Todos os campos são obrigatórios!" });
    }

    try {
        if (!validateCPF(cpf_format)) 
            return res.status(400).send({ message: "CPF inválido. Digite um CPF válido!" });

        if (!isValidEmail(email)) 
            return res.status(400).send({ message: "Email inválido. Digite um email válido!" });

        if(!isValidTelefone(telefone))
            return res.status(400).send({ message: "Telefone inválido. Digite um telefone no formato (XX)XXXXX-XXXX!" })

        if (!isValidStatus(status))
            return res.status(400).send({ message: "Status inválido. O status deve ser 'ACTIVE' ou 'INACTIVE'." });

        const cpfExistsWithoutFormat = await cpfExists(cpf_format);
        if (cpfExistsWithoutFormat) 
            return res.status(400).send({ message: "Já existe uma pessoa cadastrada com este CPF!" });

        const newReq = { nome: nomeFormatted, email, telefone, nascimento: nascimentoFormatted, cpf: cpf_format, status: statusFormatted };
        console.log(newReq);
        const person = await people.create(newReq);
        return res.status(201).send(person);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro ao adicionar dados!" });
    }
};

const editPersonByCPF = async (req, res) => {
    const { nome, email, telefone, nascimento, cpf, status } = req.body;

    const nascimentoFormatted = formatDATE(nascimento);
    const cpf_format = cpf.replace(/[.-]/g, "");
    const {nomeFormatted, statusFormatted } = upperCase(nome, status);

    try {
        if (!validateCPF(cpf_format))
            return res.status(400).send({ message: "CPF inválido. Digite um CPF válido!" });

        if (!isValidEmail(email)) 
            return res.status(400).send({ message: "Email inválido. Digite um email válido!" });

        if(!isValidTelefone(telefone))
            return res.status(400).send({ message: "Telefone inválido. Digite um telefone no formato (XX)XXXXX-XXXX!" })

        if (!isValidStatus(status))
            return res.status(400).send({ message: "Status inválido. O status deve ser 'ACTIVE' ou 'INACTIVE'." });

        const existsPerson = await people.findByPk(cpf_format);
        
        if (!existsPerson)
            return res.status(404).send({ message: "A pessoa com este CPF não foi encontrada." });

        const dataPerson = existsPerson;
    
        // Atualiza os dados da pessoa
        dataPerson.nome = nomeFormatted;
        dataPerson.email = req.body.email;
        dataPerson.telefone = req.body.telefone;
        dataPerson.nascimento = nascimentoFormatted;
        dataPerson.cpf = cpf_format;
        dataPerson.status = statusFormatted;

        // Salva as alterações no banco de dados
        const updatedPerson = await dataPerson.save();
        return res.status(200).send(updatedPerson);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro ao editar os dados da pessoa!" });
    }
};

const deletePersonByCPF = async (req, res) => {
    const cpf = req.params.cpf;
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

