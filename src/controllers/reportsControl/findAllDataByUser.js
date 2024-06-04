const {User, Profile} = require('../../models/associations');

const findAllDataByUser = async (req, res) => {
    try {
        const usernameFormatted = req.params.username.toUpperCase();

        //Uso do include: A propriedade include é usada para buscar dados de tabelas relacionadas. No exemplo, ProfileModel representa o modelo da tabela profile.
        const user = await User.findOne({
            where: { username: usernameFormatted },
            include: [{
                model: Profile
            }]
        });

        if (user){
            res.status(200).send(user);
        }
       
        res.status(404).send({ message: 'Usuário não encontrado' });
       
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar dados do usuário', error });
    }
};

module.exports = findAllDataByUser