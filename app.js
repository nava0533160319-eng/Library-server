const express = require('express');
const server = express();
import cors from 'cors';
import helmet from 'helmet';
const rateLimit = require('express-rate-limit');
const { limiter, logRequestDetails } = require('./middlewares/requestLogger');


const indexRouter = require('./routers/index.router');
const createInactiveDayMiddleware = require('./middlewares/inactiveDay.middleware');
const attachDateToImage = require('./middlewares/attachDateToImage.middleware');
const printRequestDate = require('./middlewares/printRequestDate.middleware');
const { notFoundHandler, generalErrorHandler } = require('./middlewares/errorHandlers.middleware');

const inactiveDay = createInactiveDayMiddleware(['Friday', 'Saturday']);

server.use(express.json());
server.use(cors());
server.use(inactiveDay);
server.use(attachDateToImage);
server.get('*', printRequestDate);

server.use(helmet());
server.use(limiter);
server.use(logRequestDetails);

server.use('/api', indexRouter);

// Handle not found routes and errors after all routes
server.use(notFoundHandler);
server.use(generalErrorHandler);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
