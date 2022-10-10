import { serverEnvironment } from "../config/server.config.js";
import { returnMessage } from "../utils/helper.util.js";

// middleware
export const authMiddleware = (req, res, next) => {
  req.header('authorization') == serverEnvironment.AUTH_KEY
    ? next()
    : res.status(401).json(returnMessage(true, "Error -1: " + req.originalUrl + " no autorizado", null))
}