import twilio from "twilio";

import { serverConfig } from '../configs/server.config.js';
import { logger } from './winston.util.js';

var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOKEN;
var whatsappNumber = process.env.TWILIO_WHATSAPP;

const client = twilio(accountSid, authToken, {
    lazyLoading: true
});

const sendSms = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: from,
      to: to
    });
    logger.info.info('twilioSMS:::' + message);   
  }
  catch (error) {
    logger.info.error('twilioSMS:::' + error);     
  }
}

const sendWhatsApp = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: from,
      to: to
    })
    logger.info.info('twilioWhatsApp:::' + message);   
  } 
  catch (error) {
    logger.info.error('twilioWhatsApp:::' + error);     
  }
}


export {
  sendSms,
  sendWhatsApp
}