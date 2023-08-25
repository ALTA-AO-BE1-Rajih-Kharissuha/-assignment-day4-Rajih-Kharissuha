const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // Level minimum untuk dicatat
  format: winston.format.json(), // Format pencatatan
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logger.log" }), // Menyimpan di file
  ],
});

module.exports = logger;
