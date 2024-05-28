const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // .split(' ') --> divide a string em um array e pega o segundo elemento (token)
    const token = req.headers.authorization.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err) => {
        console.log(JWT_SECRET)
        console.log()
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ error: 'Token inválido', err });
            } else if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ error: 'Token expirado' });
            } else {
                return res.status(500).json({ error: 'Erro ao verificar o token' });
            }
        }

        next();
    });
};

module.exports = verifyToken;
