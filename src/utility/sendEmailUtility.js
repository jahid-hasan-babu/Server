// const nodemailer = require('nodemailer');

// const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

//     let transporter = nodemailer.createTransport({
//         host: 'mail.teamrabbil.com',
//         port: 25,
//         secure: false,
//         auth: {
//             user: "info@teamrabbil.com",
//             pass: '~sR4[bhaC[Qs'
//         },tls: {
//             rejectUnauthorized: false
//         },
//     });


//     let mailOptions = {
//         from: 'Task Manager MERN <info@teamrabbil.com>',
//         to: EmailTo,
//         subject: EmailSubject,
//         text: EmailText
//     };

//     return  await transporter.sendMail(mailOptions)

// }
// module.exports=SendEmailUtility

const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");
require("dotenv").config()
let password = process.env.SMTP_PASS;
let sentEmailUtility = async (emailTo,emailText,emailSub) =>{
    let transporter = nodemailer.createTransport(
        smtpTransporter({
            service : "Gmail",
            auth : {
                user : "ishanrana094@gmail.com",
                pass : password
            }
        })
    );
    let mailOption = {
        from : "ishanrana094@gmail.com",
        to : emailTo,
        subject : emailSub,
        text : emailText
    }
    return transporter.sendMail(mailOption)
}

module.exports = sentEmailUtility