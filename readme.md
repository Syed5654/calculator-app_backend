## Getting Started

```sh
npm install
```

### Compile

```sh
npm run dev
```

## Database
Set up a MySQL database and create a new database.

#### Migrate Database

Run the following command in your terminal to migrate the DB

```sh
npx sequelize-cli db:migrate
```

## Features

User Authentication: Users can register, log in, and access the calculator features.
History Tracking: Each user's calculation history is saved on the backend, and they can view their previous calculations.
Only logged-in users have access to the calculator features.