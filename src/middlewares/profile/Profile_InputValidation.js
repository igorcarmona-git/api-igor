const verifyDate = (birthdate) => {
    const date = new Date(birthdate);

    if (date.toString() === "Invalid Date") {
        return false;
    }
    return true;
}

const profileValidation = (req, res, next) => {
    const BrazilStates = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", 
        "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", 
        "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];
    
    const { bio, birthdate, city, state } = req.body;

    if (!bio || !birthdate || !city || !state) {
        return res.status(400).send({ message: "Todos os campos precisam ser preenchidos!" });
    }

    if (bio.length < 10) {
        return res.status(400).send({ message: "Bio deve ter pelo menos 10 caracteres!" });
    }

    if (!birthdate) {
        return res.status(400).send({ message: "Data de nascimento obrigatória!" });
    }

    if(!verifyDate(birthdate)) {
        return res.status(400).send({ message: "Data de nascimento inválida!" });
    }

    if(!BrazilStates.includes(state)) {
        return res.status(400).send({ message: "Estado inválido! Coloque somente as siglas dos estados brasileiros" });
    }

    next();
};

module.exports = profileValidation;