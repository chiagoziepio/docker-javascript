const http = require("http");
const _ = require("lodash");

const message = _.upperCase("Hello from Tut4!");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end(message);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
