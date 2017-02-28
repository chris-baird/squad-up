var Game = require('../models/game');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
  getAllGames,
  createGame,
  deleteGame
};

function getAllGames(req, res, next) {
  // console.log('Get All Triggered');
  Game.find({}).exec().then(games => {
    res.json(games);
    // console.log(games)
  }).catch(err => res.status(500).json(err));
}

function createGame(req, res, next) {
  // console.log('Create Triggered');
  req.body.user = req.user._id;
  Game.create(req.body).then(newGame => {
    res.status(201).json(newGame);
  }).catch(err => res.status(400).json(err));
}

function deleteGame(req, res, next) {
  Game.findByIdAndRemove(req.params.id).then(deletedGame => {
    res.json(deletedGame);
  }).catch(err => res.status(400).json(err));
}

// function userGames(req, res, next) {
//   Game.findOne()
// }

