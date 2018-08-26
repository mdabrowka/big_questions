const nodemailer = require('nodemailer');
const emailModule = require('./emailModule');

//nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.kutyla.design',
        port: 465,
        secure: true, // true for 465, false for other ports
        tls: { rejectUnauthorized: false },
        auth: {
            user: "mailer@kutyla.design", // generated ethereal user
            pass: "7.m0?sV3j[0w" // generated ethereal password
        }
    });
  //});

let mailOptions = {
  from: "martadabrowka@gmail.com",
  to: "martadabrowka@gmail.com",
  subject: "Hello",
  text: emailModule.adminEmail
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent', info.messageId);
});
