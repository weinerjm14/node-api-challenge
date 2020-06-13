const express = require('express');
// routers import

const ProjectsRouter = require('./projectRouter');
const ActionsRouter = require('./actionsRouter');

const server = express();

server.use(express.json());
// router use
server.use('/projects', ProjectsRouter);
server.use('/actions', ActionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Sprint Challenge!</h2>`);
});

//custom middleware

module.exports = server;
