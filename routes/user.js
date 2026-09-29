const { client } = require("../utils/init-db");

const createUser = async (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const { name, email } = JSON.parse(body);

      if (!name || !email) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });

        return res.end(
          JSON.stringify({
            error: "Name and email are required",
          }),
        );
      }

      const result = await client.query(
        `
          INSERT INTO users (name, email)
          VALUES ($1, $2)
          RETURNING id, name, email;
          `,
        [name, email],
      );

      res.writeHead(201, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(result.rows[0]));
    } catch (error) {
      console.error(error);

      res.writeHead(500, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          error: "Failed to create user",
        }),
      );
    }
  });

  return;
};

module.exports = {
  createUser,
};
