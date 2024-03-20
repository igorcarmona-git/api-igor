# Trabalho Acadêmico: API REST para CRUD de Pessoas

Este é um trabalho acadêmico desenvolvido para a disciplina de Desenvolvimento Web. A API foi construída utilizando Node.js, Nodemon, Express, Sequelize-SQLite como banco de dados.

## Funcionalidades

- **CRUD**: A API oferece operações CRUD (Criar, Ler, Atualizar, Deletar) com validações baseadas nos dados fornecidos nas requisições HTTP.
  
- **Consistência de Dados**: Utilizamos o SQLite para garantir a consistência e persistência dos dados.

### Endpoints

- `GET /people`: Retorna a lista de todas as pessoas armazenadas no banco de dados.
- `GET /people/:cpf`: Retorna os detalhes de uma pessoa específica com base no CPF fornecido.
- `POST /people`: Permite criar uma nova entrada no banco de dados com os dados fornecidos.
- `PUT /people/:cpf`: Permite editar os detalhes de uma pessoa com base no CPF fornecido.
- `DELETE /people/:cpf`: Permite excluir uma entrada do banco de dados com base no CPF fornecido.

#### Corpo da Requisição (HTTP BODY)

```json
{
  "nome": "João Pedro da Silva",
  "email": "pedro.joao@gmail.com",
  "telefone": "4499980-5479",
  "nascimento": "2008-02-28",
  "cpf": "19692736075",
  "status": "active"
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

Para mais informações, entrar em contato via redes sociais.
