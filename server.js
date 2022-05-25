const express = require("express");

const app = express();

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'requests.log' }),
    ],
});


app.get('/request1', (req, res) => {
    logger.log('info', 'Request 1');
    res.status(200).json({
        status: 'success'
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})