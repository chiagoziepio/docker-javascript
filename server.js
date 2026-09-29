const http = require("http");
const _ = require("lodash");

const { createUser } = require("./routes/user");
const { initializeDatabase, client } = require("./utils/init-db");

const message = _.upperCase("Hello from Tut4!");

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/users") {
    return await createUser(req, res);
  }
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
  await initializeDatabase(client);

  server.listen(3000, () => {
    console.log("Server running on port 3000");
    console.log("Connected to PostgreSQL");
  });
}

startServer();
