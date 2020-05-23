const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');
const Game = require('../models/game');
const SECRET = process.env.SECRET;

module.exports = {
  create,
  login,
  logout,
  me,
  userGames
};

const create = (req, res, next) => {
  User.create(req.body).then(user => {
    auth.createToken(user, res);
    res.json({msg: 'signed up successfully'});
  }).catch( err => res.status(400).json(err) );
}

const login = (req, res, next) => {
  User.findOne({email: req.body.email}).exec().then(user => {
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        auth.createToken(user, res);
        res.json({msg: 'logged in successfully', user_id: user._id});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  }).catch(err => res.status(401).json(err));
}

const logout = (req, res, next) => {
  req.session.userId = null;
  res.status(200).json({});
}

function me(req, res, next) {
  res.json(req.user);
}

function userGames(req, res, next) {
  Game.find({user: req.user._id}, function(err, games) {
    if (err) {
      res.send(err);
    } else {
      res.json(games);
    }
  })
}


