const { User, Image } = require('../models/associations');

const UploadImageUser = async (req, res) => {
    try {
        const { username } = req.params.toUpperCase();
        const user = await User.findOne({ where: { username } });

        if (!user) 
            return res.status(404).send({ message: "Nome de usuário inválido. Insira um nome de usuário!" });

        if (!req.file) 
            return res.status(400).send({ message: "Nenhuma imagem foi enviada!" });

        if(req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') 
            return res.status(400).send({ message: "Insira uma imagem JPEG/PNG!" });

        const image = await Image.create({
            filename: req.file.filename,
            path: req.file.path,
            userId: user.id
        });
        return res.status(201).send({ message: "Imagem enviada com sucesso!"}, image);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { UploadImageUser }