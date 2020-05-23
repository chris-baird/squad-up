const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAILSERVICEUSER,
    pass: process.env.EMAILSERVICEPASS
  }
});

const sendMail = (req, res, next) => {
  const mailOptions = {
    from: process.env.EMAILSERVICEUSER,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      res.status(500).json(err);
    } else {
      res.json(info);
    }
  });
}

module.exports = {
  sendMail
};
