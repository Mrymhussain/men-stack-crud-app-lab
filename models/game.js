const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  homeTeam: String,
  awayTeam: String,
  date: String,
  time: String,
  arena: String,
  importance: String,
  notes: String
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;