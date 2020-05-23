const Game = require('../models/game');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
  getAllGames,
  createGame,
  deleteGame
};

const getAllGames = (req, res, next)=> {
  Game.find({}).populate('user').exec().then(games => {
    res.json(games);
  }).catch(err => res.status(500).json(err));
}

const createGame = (req, res, next) => {
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

