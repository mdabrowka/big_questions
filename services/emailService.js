const nodemailer = require('nodemailer');
const emailModule = require('./emailModule');


    var transporter = nodemailer.createTransport({
        host: 'mail.kutyla.design',
        port: 465,
        secure: true,
        tls: { rejectUnauthorized: false },
        auth: {
            user: "mailer@kutyla.design",
            pass: "7.m0?sV3j[0w"
        }
    });

    var sendMessage = (emailInfo) => {
      return transporter.sendMail(emailInfo, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent', info.messageId);
    });
  }

module.exports = sendMessage;
