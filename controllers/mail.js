var nodemailer = require('nodemailer');

module.exports = {
  sendMail
};


var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAILSERVICEUSER, // Your email id
    pass: process.env.EMAILSERVICEPASS // Your password
  }
});

function sendMail(req, res, next) {
  var mailOptions = {
    from: process.env.EMAILSERVICEUSER, // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if(err) {
      res.status(500).json(err);
    } else {
      res.json(info);
    }
  });
}
