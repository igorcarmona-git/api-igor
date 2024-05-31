const { User, Profile } = require('../models/associations');

const getProfileByUser = async (req, res) => {
    try {
        const usernameFormatted = req.params.username.toUpperCase();

        // Verifica se o usuário existe
        const user = await User.findOne({ where: { username: usernameFormatted } });
        if (!user) {
            return res.status(404).send({ message: "Nome de usuário inválido. Insira um nome de usuário!" });
        }

        // Buscar o perfil de um usuário específico
        const profile = await Profile.findOne({
            where: { userId: user.id },
            include: {
                model: User,
                attributes: ['username', 'email', 'status'], // Atributos do modelo User que você deseja incluir
            },
        });

        if (!profile) {
            return res.status(404).send({ message: "Perfil não encontrado!" });
        }

        return res.status(200).send(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Ocorreu um erro ao buscar dados de perfil!" });
    }
};

const createProfile = async (req, res) => {
  try {
      const usernameFormatted = req.params.username.toUpperCase();
      const { bio, birthdate, city, state } = req.body;

      // Convertendo valores para maiúsculas
      const upperCity = city.toUpperCase();
      const upperState = state.toUpperCase();

      // Verifica se o nome de usuário já existe
      const user = await User.findOne({ where: { username: usernameFormatted } });
      if (!user) {
          return res.status(404).send({ message: "Nome de usuário não existe!" });
      }

      // Verifica se o perfil já existe para esse usuário
      const existingProfile = await Profile.findOne({ where: { userId: user.id } });
      if (existingProfile) {
          return res.status(400).send({ message: "Perfil já existe para este usuário!" });
      }

      // Criar perfil associado ao usuário
      const profile = await Profile.create({
          bio,
          birthdate,
          city: upperCity,
          state: upperState,
          userId: user.id // Adicionando o userId no perfil
      });

      return res.status(201).send(profile);
  } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Ocorreu um erro ao adicionar dados de perfil!" });
  }
};

const editProfile = async (req, res) => {
    const usernameFormatted = req.params.username.toUpperCase();

    const { bio, birthdate, city, state } = req.body;

    // Convertendo valores para maiúsculas
    const upperCity = city.toUpperCase();
    const upperState = state.toUpperCase();

    // Verifica se o nome de usuário já existe
    const user = await User.findOne({ where: { username: usernameFormatted } });
    if (!user) {
        return res.status(404).send({ message: "Nome de usuário não existe!" });
    }

    // Verifica se o perfil já existe para esse usuário
    const existingProfile = await Profile.findOne({ where: { userId: user.id } });
    if (!existingProfile) {
        return res.status(400).send({ message: "Perfil não existe para este usuário!" });
    }

    // Editar perfil associado ao usuário
    existingProfile.bio = bio;
    existingProfile.birthdate = birthdate;
    existingProfile.city = upperCity;
    existingProfile.state = upperState;

    const profileUpdated = existingProfile.save();
    return res.status(201).send(profileUpdated);
}

module.exports = { createProfile, getProfileByUser, editProfile};