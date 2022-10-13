import twilio from "twilio";

var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOKEN;

export const client = twilio(accountSid, authToken, {
    lazyLoading: true
});
