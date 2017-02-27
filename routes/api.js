var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users');
var gameCtrl = require('../controllers/games');

// Public routes (no auth required)
router.post('/users/login', userCtrl.login);
router.get('/users/logout', userCtrl.logout);
router.post('/users', userCtrl.create);
router.get('/users/me', userCtrl.me);

// Auth middleware (routes below need authentication)
router.use(function(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
});

// Protected routes (authentication required)
router.get('/games', gameCtrl.getAllGames);
router.post('/games', gameCtrl.createGame);
router.delete('/games/:id', gameCtrl.deleteGame);

module.exports = router;
