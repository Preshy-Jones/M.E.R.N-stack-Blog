const { createLogger, format, transports } = require("winston");
const { combine, timestamp, errors, splat, json, metadata } = format;
//require("winston-mongodb");

// const t = [
//   new transports.Console(),
// ];

// if (process.env.LOGS_DB_URI) {
//   t.push(new transports.MongoDB({
//     db: process.env.LOGS_DB_URI,
//     options: {
//       useUnifiedTopology: true,
//       useNewUrlParser: true
//     },
//     storeHost: true,
//     collection: "fb_hub_logs",
//     capped: true,
//     cappedSize: 400000000
//   }));
// }

const logger = createLogger({
  format: combine(
    timestamp(),
    errors({ stack: true }),
    splat(),
    metadata(),
    json(),
  ),
  transports: t
});

module.exports = logger;
