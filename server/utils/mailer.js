const nodemailer = require("nodemailer");
require("dotenv").config;

const sendMail = async (recipients, subject, message) => {
  try {
    const from = `Emart Admin<no-reply@emart.vercel.app}>`;
    // CREATE THE TRANSPORT
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // SEND MAIL
    return await transport.sendMail({
      from,
      to: Array.isArray(recipients) ? recipients.join(", ") : recipients,
      html: message,
      subject,
      contentType: "text/html",
    });
  } catch (e) {
    console.log("EMAIL ERROR:",e.message)
    return false
  }
};

module.exports = sendMail;
