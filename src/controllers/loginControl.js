const login = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const person = require('../models/personModel');

const doLogin = async (req, res) => {
    const { cpf, password } = req.body;

    try {
        const [loginResult, personResult] = await Promise.all([
            login.findByPk(cpf),
            person.findByPk(cpf)
        ]);

        if (loginResult && personResult) {
            const passwordMatch = await bcrypt.compare(password, loginResult.password);

            if (!passwordMatch) {
                return res.status(401).send({ error: 'CPF ou senha inválido' });
            }

            // Verificação de senha, geração de token JWT, etc.
            const token = jwt.sign({ cpf: loginResult.cpf }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).send({ token });
        }

    } catch (error) {
        return res.status(500).send({ error: 'Erro ao fazer login' });
    }
};

module.exports = { doLogin };
