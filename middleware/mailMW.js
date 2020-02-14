const nodemailer = require('nodemailer');
module.exports.mailreg=function(too,token) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreplymarkmy@gmail.com',
            pass: 'asd'
        }
    });
    var mailOptions = {
        from: 'MarkMyDoctor <noreplymarkmy@gmail.com>',
        to: too,
        subject: 'Email cím megerősítés',
        text: 'http://markmydoctor.us.to/auth/'+too+'/'+token,
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
        service: 'gmail',
        auth: {
            user: 'noreplymarkmy@gmail.com',
            pass: 'asd'
        }
    });
     var mailOptions = {
        from: 'MarkMyDoctor <noreplymarkmy@gmail.com>',
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
