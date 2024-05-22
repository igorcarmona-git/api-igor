const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Falha na autenticação do token' });
        }

        // Se o token for válido, você pode acessar os dados decodificados no objeto 'decoded'
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
