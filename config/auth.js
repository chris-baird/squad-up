const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports.createToken = (user, res) => {
  const token = jwt.sign(
    {user: user},
    SECRET,
    {expiresIn: '24h'}
  );
  res.set('Authorization', token);
  return token;
}

module.exports.verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.get('Authorization');
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.removeHeader('Authorization');
    next();
  }
}

