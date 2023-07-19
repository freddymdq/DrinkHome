import { Router } from "express";

const Route = Router();

Route.get("/", (req, res) => {
    req.logger.error("Error");
    req.logger.warn("Alerta!");
    req.logger.verbose("Verbose");
    req.logger.info("Info");
    req.logger.debug("Debug");
    req.logger.fatal("Fatal");
    req.logger.silly("Silly");
    req.logger.http("Http");

    res.send("logger");
});

export default Route;