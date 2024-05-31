const bcrypt = require('bcrypt');

const passHash = async (req, res, next) => {
    const { password } = req.body;
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    req.body.password = hash;

    return next();
}

module.exports = passHash;