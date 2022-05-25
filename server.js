const express = require("express");

const app = express();
app.use(express.json());
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'requests.log', level: 'info' }),
        new winston.transports.File({ filename: 'warnings.log', level: 'warn' })
    ],
});


app.get('/request1', (req, res) => {
    logger.log('info', 'Request 1');
    res.status(200).json({
        status: 'success'
    })
})

app.post('/request2', (req, res) => {
    console.log(req.body);
    const { logReq } = req.body;
    if (!logReq) {
        res.status(400).json({
            status: 'error',
            message: 'Request Should have a logReq'
        })
    }
    logger.log(logReq, 'Request 2');
    res.status(200).json({
        status: 'success',
        logType: logReq
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})