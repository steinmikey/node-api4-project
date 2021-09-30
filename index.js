require("dotenv").config();

const cors = require("cors");

const express = require("express");

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><p>/users should work too</p>");
});

server.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Michael" },
    { id: 2, name: "Steiner" }
  ]);
});

server.post("/api/register", (req, res) => {
  const newUser = { username: req.body.username, password: req.body.password };
  res.json(newUser);
});

server.post("/api/login", checkCredentials, (req, res) => {
  res.json({ message: "Welcome!" });
});

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`\n-------------\n ** server listening on port ${port} ** \n`);
});

function checkCredentials(req, res, next) {
  if (req.body.username === "misha" && req.body.password === "password") {
    next();
  } else {
    res.status(400).json({
      message: "wrong name or password"
    });
  }
}
