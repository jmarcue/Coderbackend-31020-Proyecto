import dotenv from 'dotenv';
import minimist from 'minimist';

dotenv.config();

const portDef = process.env.PORT || 3000;
const { port } = minimist(process.argv.slice(2), { alias: { "p": "port" }, default: { "port":  portDef} });

export const serverConfig = {
  PORT: port || portDef,
  STORAGE: process.env.STORAGE,
  MONGO_ATLAS: process.env.MONGO_ATLAS,
  MONGO_LOCAL: process.env.MONGO_LOCAL,
  MAILER_USER: process.env.NODEMAILER_USER,
  MAILER_PASS: process.env.NODEMAILER_PASS,
  MAILER_HOST: process.env.NODEMAILER_HOST,
  MAILER_PORT: process.env.NODEMAILER_PORT,
  TWILIO_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_TOKEN: process.env.TWILIO_AUTH_TOKEN
};