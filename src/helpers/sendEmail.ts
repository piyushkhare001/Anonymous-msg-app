

import React from "react";
const nodemailer = require('nodemailer');


export async function sendVerificationEmail(
  email : string,
  username : string,
  verifyCode : string
) 
 {
try {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    secure: false,
  })

  let info = await transporter.sendMail({
    from: `Mistery-Message || OTP`, // sender address
    to: `${email}`, // list of receivers
    subject: 'Mystery Message || Verification Code', // Subject line
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Opt-in Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table {
            border-collapse: collapse;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .header img {
            width: 100px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #333333;
        }
        .content p {
            color: #666666;
            line-height: 1.5;
        }
        .cta-button {
            display: inline-block;
            padding: 15px 25px;
            margin: 20px 0;
            font-size: 16px;
            color: #ffffff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            color: #999999;
        }
            Text{
               font-size: 60px;
                  font-family: Arial, sans-serif;
            }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
          
        </div>
        <div class="content">
            <h1>Welcome ${username}</h1>
            <p>   Thank you for registering. Please use the following verification
      code to complete your registration:</p>
                <Text>${verifyCode}</Text> 
        </div>
        <div class="footer">
            <p>If you did not request this email, please ignore it.</p>
        </div>
    </div>
</body>
</html>

    
    `
  })
  console.log(info.response)
  return { success: true, message: 'Verification email sent successfully.' };
  return info
    
} catch (err) {
  console.error('Error sending verification email:', err);
  return { success: false, message: 'Failed to send verification email.' };
}
}


