# Desafio Módulo 3 de Back-end - Cubos

## API de gerenciamento da Tabela do Brasileirão 2019.

Repositório referente a uma API REST que tem como função administrar um banco de dados com informações dos jogos do Brasileirão 2019 que irá alimentar a página do [Desafio de Front-end](https://github.com/buxexalg/desafio-modulo3-frontend) assim como autenticar o login da mesma.

# Conteúdos

-   Endpoints
    -   Requisições dos jogos
    -   Requisição de autenticação
-	Banco de Dados
-   Instalação
-   Dependências

## Endpoints

### Requisições dos jogos

#### Listar jogos por rodada

GET `/jogos/:rodada`
Retorna todos os jogos de acordo com o parâmetro de rodada.

#### Editar placar de um jogo

POST `/jogos`
Recebe um JSON como entrada contendo id, golsCasa e golsVisitante e faz a alteração no banco de dados. Todos os um campos são obrigatórios.

##### Exemplo de JSON
```JS
{
	"id": 1,
	"golsCasa": 2,
	"golsVisitante": 1
}
```

#### Obter classificação

GET `/classificacao`
Retorna a classificação final do Brasileirão 2019.

### Requisição de autenticação

#### Autenticar

POST `/auth`
Recebe um JSON como entrada contendo email e password e retorna um token de autenticação. O mesmo é válido por 1 hora.

## Instalação

Para rodar o projeto, você precisará ter o Node.js instalado na sua máquina.

### Banco de Dados

A inicialização do banco de dados pode ser feita através da inicialização em node do arquivo `./src/repositories/schema.js` adicionando `up()` na última linha. Para cadastrar as informações de um banco de dados, o arquivo `.env` pode ser utilizado, adicionando as seguintes informações:

			DB_HOST=
			DB_NAME=
			DB_USER=
			DB_PORT=
			DB_PW=

Caso não queira fazer integração com um banco de dados, [um bd de referência](desafio-3-back-cubos-academy.herokuapp.com) pode substituir os endpoints

### Node

#### Instalação do Node no Windows

Acesse a página oficial do Node.js (https://nodejs.org) e baixe o instalador. Tenha certeza também que tem o `git` disponível no seu PATH, você também pode precisar do `npm`.

#### Instalação do Node no Ubuntu

Você pode instalar facilmente o nodejs e o npm com um apt install, basta seguir os seguintes comandos.

          $ sudo apt install nodejs
          $ sudo apt install npm

#### Outros sistemas operacionais
Você pode achar mais informações sobre a instalação no site oficial do Node.js (https://nodejs.org/) e no site oficial do NPM.

### Outras dependências

Após instalar o Node, execute `\$ npm install` para instalar as seguintes dependências:

-	[Koa](https://koajs.com/)
-	[Koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)
-	[Koa-router](https://www.npmjs.com/package/koa-router)
-	[Koa/cors](https://www.npmjs.com/package/@koa/cors)
-	[bcryptjs](https://www.npmjs.com/package/bcryptjs)
-	[Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-	[Dotenv](https://www.npmjs.com/package/dotenv)
-	[Node-postgres](https://node-postgres.com/)


