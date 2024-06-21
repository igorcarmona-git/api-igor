# API REST para CRUD de Pessoas

Este é um trabalho acadêmico desenvolvido para a disciplina de Desenvolvimento Web. A API foi construída utilizando Node.js, Nodemon, Express, Sequelize ORM, Postgree (como banco de dados), dotenv, cors, jsonwebtoken, bcrypt, multer.

## Funcionalidades

- **CRUD**: A API oferece operações CRUD (Criar, Ler, Atualizar, Deletar) com validações baseadas nos dados fornecidos nas requisições HTTP.
- **Autenticação criptografada**: Foi utilizado "bcrypt" para criptografar dados além de utilizar bearer tokens para rotas autenticadas.
- **Consistência de Dados**: Utilizamos o postgree via cloud no Render para garantir a consistência e persistência dos dados.

### Endpoints
**Users**:
- `GET /users`: Retorna a lista de todos os usuários armazenadas no banco de dados. *(Autenticada)*
- `GET /users/:username`: Retorna os dados do usuário fornecido. *(Autenticada)*
- `GET /users/allactive`: Retorna todos os usuários ativos. *(Autenticada)*
- `GET /users/allinactive`: Retorna todos os usuários inativos. *(Autenticada)*
- `POST /users`: Permite criar uma nova entrada no banco de dados com os dados fornecidos para um usuário. 
- `PUT /users/:username`: Permite editar os detalhes de uma pessoa com base no CPF fornecido. *(Autenticada)*
- `DELETE /users/:username`: Permite excluir uma entrada do banco de dados com base no usuário fornecido. *(Autenticada)*

**Profile**:
- `GET /profiles/:username`: Retorna os dados do perfil do usuário fornecido. *(Autenticada)*
- `POST /profiles/:username`: Permite criar os dados do perfil do usuário fornecido. *(Autenticada)*
- `PUT /profiles/:username`: Permite editar os dados do perfil do usuário fornecido. *(Autenticada)*

**Login**:
- `POST /login`: Rota para realização do login na aplicação, te retorna um BEARER Token.

**Reports**:
- `GET /reports/findAllDataByUser/:username`: Permite visualizar todos os dados de perfil e de usuário, de um usuário fornecido. *(Autenticada)*

#### Corpo da Requisição (HTTP BODY)
**Users**
- Deve-se fazer o login e passar o token em authorization.
```json
{
  "username": "igorcarmona",
  "email": "igorcarmonawork@gmail.com",
  "password": "Senha-Qualquer@123",
  "cpf": "19692736075",
  "status": "active"
}
```

**Login**
```json
{
  "username": "igorcarmona",
  "password": "Senha-Qualquer@123",
}
```

**Profile**
```json
{
  "bio": "Uma pessoa bastante divertida!",
  "birthdate": "2000-05-25",
  "city": "Cianorte",
  "state": "pr",
}
```

## Pré-requisitos

Certifique-se de ter o ambiente de desenvolvimento Node.js configurado em sua máquina. Você pode seguir a [documentação oficial do Node.js](https://nodejs.org/en) para configurar o ambiente.

## Instalação

Para instalar e configurar o projeto localmente, siga estas etapas:

1. Clone o repositório:

```bash
git clone https://github.com/igorcarmona-git/trabalho-api.git
cd trabalho-api
```

2. Instale as dependências:
   
```bash
npm install
```
ou 
```bash
yarn install
```

## Uso
1. Inicie a API na raiz da pasta do projeto.

```bash
npm start
```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar o projeto.

**Para mais informações, entrar em contato via redes sociais.**
