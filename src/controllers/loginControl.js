const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const doLogin = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    console.log(JWT_SECRET)
    const { username, password } = req.body;
    const usernameFormatted = username.toUpperCase();

    if (!usernameFormatted || !password) {
        return res.status(400).send({ message: 'Usuário ou senha inválidos!' });
    }

    try {
        const user = await userModel.findOne({ where: { username: usernameFormatted } });

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
        console.error(error);
        return res.status(500).send({ message: 'Ocorreu um erro ao fazer login.' });
    }
};

module.exports = { doLogin };