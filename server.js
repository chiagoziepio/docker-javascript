const http = require("http");
const _ = require("lodash");
const { Client } = require("pg");

const message = _.upperCase("Hello from Tut4!");

const client = new Client({
  host: "db",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

const server = http.createServer(async (req, res) => {
  try {
    await client.query("SELECT NOW()");

    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end(message + "\nDatabase connection successful!");
  } catch (error) {
    console.error(error);

    res.writeHead(500, {
      "Content-Type": "text/plain",
    });

    res.end("Database connection failed");
  }
});

async function startServer() {
  await client.connect();

  server.listen(3000, () => {
    console.log("Server running on port 3000");
    console.log("Connected to PostgreSQL");
  });
}

startServer();
