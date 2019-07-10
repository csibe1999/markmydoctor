const nodemailer = require('nodemailer');
module.exports.mailreg=function(too,token) {
    var transporter = nodemailer.createTransport({
        host:"mail.nethely.hu",
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@markmydoctor.szakdoga.net',
            pass: 'destreater'
        }
    });
    var mailOptions = {
        from: 'MarkMyDoctor <noreply@markmydoctor.szakdoga.net>',
        to: too,
        subject: 'Email cím megerősítés',
        text: 'http://markmydoctor.us.to/'+too+'/'+token,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
  };
  module.exports.mailfor=function(too,token) {
    var transporter = nodemailer.createTransport({
        host:"mail.nethely.hu",
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@markmydoctor.szakdoga.net',
            pass: 'destreater'
        }
    });
     var mailOptions = {
        from: 'MarkMyDoctor <noreply@markmydoctor.szakdoga.net>',
        to: too,
        subject: 'Jelszó emlékeztető',
        text: 'Új jelszó: http://markmydoctor.us.to/password/'+too+'/'+token,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}