process.env.NODE_CONFIG_DIR = __dirname + '/config';

const express = require('express');
const config = require('config');

const sequelize = require('./config/db');
const PORT = config.get("port") || 5050;
const mainRouter = require("./routes/index.routes");

const app = express();

const requestLogger = require('./middlewares/loggers/requestLogger');
const errorHandler = require('./middlewares/loggers/errorLogger');

require('./models/index.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use("/api", mainRouter);
app.use(errorHandler);

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
