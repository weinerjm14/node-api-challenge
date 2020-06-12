const express = require('express');

const server = express();
// routers import

server.use(express.json());

// router use

server.get('/', (req, res) => {
  res.send(`<h2>Sprint Challenge!</h2>`);
});

//custom middleware

module.exports = server;
