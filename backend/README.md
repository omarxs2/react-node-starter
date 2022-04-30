# Sumet REST API with postgres

## Features

- No transpilers, just vanilla javascript
- ES2017 latest features like Async/Await
- CORS enabled
- Uses [yarn](https://yarnpkg.com)
- Express + Postgres ([Sequelize](http://docs.sequelizejs.com/))
- Request validation ([express validator](https://github.com/ctavan/express-validator)
- Consistent coding styles with [editorconfig](http://editorconfig.org)
- Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
- Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
- Gzip compression with [compression](https://github.com/expressjs/compression)
- Linting with [eslint](http://eslint.org)
- Git hooks with [husky](https://github.com/typicode/husky)
- Logging with [morgan](https://github.com/expressjs/morgan)
- Monitoring with [pm2](https://github.com/Unitech/pm2)
- Documentation with [postman](https://postman.com)

## Requirements

- [Node v8.10](https://nodejs.org/en/download/current/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [PM2](http://pm2.keymetrics.io/)

## Getting Started

Clone the repo:

```bash
git clone --depth 1 https://bitbucket.org/tektik-ds/backend
cd backend
```

Install dependencies:

```bash
yarn
```

Create database if not exist: 

```bash
createdb sumet
```

Set environment variables:

```bash
cp .env.example .env
```

Set database configuration:

```bash
cp src/database/config.example.js src/database/config.js
```
Run seed file

```bash
yarn start 
yarn seeds
```

## Running Project

```bash
yarn start
```

## Database commands

```bash
# run all migrations
yarn migrate

# run all seeds
yarn seeds

# generate new migration
sequelize migration:generate --name new-migration

# generate new seed
sequelize seed:generate --name new-seeds
```

More commands [here](https://github.com/sequelize/cli).