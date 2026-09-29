const { Client } = require("pg");

const client = new Client({
  host: "db",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function initializeDatabase() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
    );
  `);

  console.log("Users table is ready");
}

module.exports = {
  initializeDatabase,
  client,
};
