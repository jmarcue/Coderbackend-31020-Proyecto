import mongoose from "mongoose";
import { serverEnvironment } from "../config/server.config.js";

const url = serverEnvironment.MONGO_ATLAS;

export const connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connection.on("connected", () => {
//   console.log("[Mongoose] - Conectado:", url);
// });

// mongoose.connection.on("error", err => {
//   console.log("[Mongoose] - error:", err);
// });