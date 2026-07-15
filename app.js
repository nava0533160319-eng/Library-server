const express = require('express');
const server = express();

const indexRouter = require('./routers/index.router');

server.use(express.json());
server.use('/api', indexRouter);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});