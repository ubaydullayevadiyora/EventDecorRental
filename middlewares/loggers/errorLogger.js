const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
    res.status(500).json({ message: 'Server error', error: err.message });
};

module.exports = errorHandler;
