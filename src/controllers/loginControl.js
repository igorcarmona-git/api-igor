const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const findInactiveUser = async (username) => {
    const userInactive = await userModel.findOne({ where: { username: username, status: 'INACTIVE' } });

    return Boolean(userInactive);
}

const doLogin = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    // Verifica se o corpo da requisição possui um username e uma senha
    const { username, password } = req.body;
    const usernameFormatted = username.toUpperCase();

    if (!usernameFormatted || !password) {
        return res.status(400).send({ message: 'Usuário ou senha inválidos!' });
    }

    try {
        const user = await userModel.findOne({ where: { username: usernameFormatted, status: 'ACTIVE' } });

        if (await findInactiveUser(usernameFormatted)) {
            return res.status(404).send({ message: 'Usuário inativo!' });
        }

        if (!user) {
            return res.status(404).send({ message: 'Usuário ou senha inválidos!' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(404).send({ message: 'Usuário ou senha inválidos!' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send({ message: 'Ocorreu um erro ao fazer login.' });
    }
};

module.exports = { doLogin };