const userModel = require('../models/userModel');

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

const upperCase = (username, status) => {
    const usernameFormatted = username.toUpperCase();
    const statusFormatted = status.toUpperCase();

    if(usernameFormatted && statusFormatted){
        return {
            usernameFormatted,
            statusFormatted
        }
    }
}

const formatCPF = (cpf) => {
    const cpf_format = cpf.replace(/[.-]/g, "");
    return cpf_format;
}

// ----------------------------------------------------------------------------------------------------------

const listUsers = async (req, res) => {
    try {
        const allPeople = await userModel.findAll();

        if(!allPeople.length){
            return res.status(404).send({ message: "Não há dados para serem retornados!"})
        }

        return res.status(200).send(allPeople);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro ao buscar dados de pessoas!" });
    }
};

const getUser = async (req, res) => {
    const username = req.params.username.toUpperCase();

    try{
        if(username){
            const person = await userModel.findOne({ where: { username } });

            if(person)
                return res.status(200).send(person)

            return res.status(404).send({ message: "Não consta registros deste usuário em nosso banco de dados!" })
        }   
    }catch(error){
        return res.status(500).send({ message: "Ocorreu um erro ao buscar dados deste usuário!" });
    }
}

const createUser = async (req, res) => {
    // Extrai os dados da requisição
    const {username, email, password, cpf, status} = req.body;
    const {usernameFormatted, statusFormatted} = upperCase(username, status)
    const cpfFormatted = formatCPF(cpf);

    // Verifique se todos os campos obrigatórios estão presentes
    if (!usernameFormatted || !email || !password || !cpf || !statusFormatted) {
        return res.status(400).send({ message: "Todos os campos são obrigatórios!" });
    }

    try {
        if (!validateCPF(cpfFormatted)) 
            return res.status(400).send({ message: "CPF inválido. Digite um CPF válido!" });

        const newReq = {
            username: usernameFormatted, 
            email, 
            password, 
            cpf: cpfFormatted, 
            status: statusFormatted
        };

        console.log(newReq)
        const person = await userModel.create(newReq);

        return res.status(201).send(person);
    } catch (error) {
        return res.status(500).send({ message: "Ocorreu um erro ao adicionar dados!" });
    }
};

const editUser = async (req, res) => {
    const {username, email, password, cpf, status} = req.body;
    const {usernameFormatted, statusFormatted} = upperCase(username, status)
    const cpfFormatted = formatCPF(cpf);

    try {
        if (!validateCPF(cpfFormatted))
            return res.status(400).send({ message: "CPF inválido. Digite um CPF válido!" });

        const existsPerson = await userModel.findOne({ where: { username: usernameFormatted } });
        
        if (!existsPerson)
            return res.status(404).send({ message: "A pessoa com este usuário não foi encontrada." });

        // Salva as alterações no banco de dados
        existsPerson.username = usernameFormatted;
        existsPerson.email = email;
        existsPerson.password = password;
        existsPerson.cpf = cpfFormatted;
        existsPerson.status = statusFormatted;

        const updatedPerson = await existsPerson.save();
        return res.status(200).send(updatedPerson);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro ao editar os dados da pessoa!" });
    }
};

const deleteUser = async (req, res) => {
    const username = req.params.username.toUpperCase();

    try{
        if(username){
            await userModel.destroy({ where: { username } });
            return res.status(200).send({message: "Foi realizada a exclusão de dados do usuário!"})
        }   
        return res.status(404).send({ message: "Não consta registros deste usuário em nosso banco de dados!" })
    }catch(error){
        console.log(error);
        return res.status(500).send({ message: "Ocorreu um erro na exclusão de dados!" });
    }
}   

module.exports = { listUsers, getUser, createUser, editUser, deleteUser };

