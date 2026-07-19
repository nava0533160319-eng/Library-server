const rateLimit = require('express-rate-limit');

// הגבלת כמות המשתמשים לכל כתובת IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});

const logRequestDetails = (req, res, next) => {
    console.log('--- New Request Received ---');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`);
    console.log(`IP: ${req.ip}`);
    console.log('----------------------------');
    next();
};

module.exports = { limiter, logRequestDetails };