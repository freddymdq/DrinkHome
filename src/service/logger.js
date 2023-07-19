import winston from "winston"
import * as dotenv from "dotenv";
import  __dirname  from "../utils.js";
import path from "path"

dotenv.config();

const currentEnv = process.env.NODE_ENV || "development";

const customLevels = {
  levels:{
      fatal:0,
      error:1,
      warn:2,
      info:3,
      http:4,
      verbose:5,
      debug:6,
      silly:7
  },
  colors: {
    fatal: "brown",
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "green",
    verbose: "white",
    debug: "black",
    silly: "gray",
  },
};

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({
          colors: customLevels.colors,
        }),
        winston.format.simple()
      ),
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [new winston.transports.Console({ level: "http" }),
    new winston.transports.File({
      filename: path.join(__dirname, "error.log"),
      level: "info",
    }),
  ],
});

export const addLogger = (req, res, next) => {
  if (currentEnv === "development") {
    req.logger = devLogger;
  } else {
    req.logger = prodLogger;
  }
  req.logger.http(`${req.method} - ${req.url}}`);
  next();
};