var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users');
var gameCtrl = require('../controllers/games');
var mailCtrl = require('../controllers/mail');



// Public routes (no auth required)
router.post('/users/login', userCtrl.login);
router.get('/users/logout', userCtrl.logout);
router.post('/users', userCtrl.create);
router.get('/users/me', userCtrl.me);
router.get('/games', gameCtrl.getAllGames);

// Auth middleware (routes below need authentication)
router.use(function(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
});

// Protected routes (authentication required)
router.post('/mail', mailCtrl.sendMail); // handle the route at yourdomain.com/sayHello
router.get('/users/games', userCtrl.userGames);
router.post('/games', gameCtrl.createGame);
router.delete('/games/:id', gameCtrl.deleteGame);

module.exports = router;
