### Features

- Get all users
- Create new user (register)
- Update user email and username
- Delete user

### Prerequisites

**Node version 20.x**

### Cloning the repository

```shell
git clone https://github.com/aungpyaephyo1412/express-ts-postgresql.git
```

### Install packages

```shell
pnpm i
pnpm migrate:generate #model migration generator cli
pnpm migrate:push #model migration to postgres
pnpm migrate:drop #drop migration files
```

### Setup Postgresql DB URL

In `.env`:

```.dotenv
PORT=*******
API_VERSION=***********
TOKEN_SECRET = **************************
POSTGRES_DB_URL = *****************************
```

### Start the index

```shell
pnpm dev
```

## Available commands

Running commands with npm `pnpm [command]`

| command             | description                   |
| :------------------ | :---------------------------- |
| `dev`               | Starts a development          |
| `build`             | Build the api                 |
| `format`            | Code format with prettier     |
| `migrate:generate`  | model migration generator cli |
| `migrate:push`      | model migration to postgres   |
| `pnpm migrate:drop` | drop migration files          |
