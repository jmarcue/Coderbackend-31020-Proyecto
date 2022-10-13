import nodemailer from 'nodemailer'
import { serverConfig } from './server.config.js';

export const transporter = nodemailer.createTransport({
  host: serverConfig.MAILER_HOST,
  port: serverConfig.MAILER_PORT,
  auth: {
    user: serverConfig.MAILER_USER,
    pass: serverConfig.MAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});