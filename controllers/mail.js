var nodemailer = require('nodemailer');

module.exports = {
  sendMail
};


var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAILSERVICEUSER,
    pass: process.env.EMAILSERVICEPASS
  }
});

function sendMail(req, res, next) {
  var mailOptions = {
    from: process.env.EMAILSERVICEUSER,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if(err) {
      res.status(500).json(err);
    } else {
      res.json(info);
    }
  });
}
