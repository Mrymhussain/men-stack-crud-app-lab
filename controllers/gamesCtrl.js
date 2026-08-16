const Game = require('../models/game.js');

const index = async (req, res) => {
  try {
    const games = await Game.find();
    res.render('games/index.ejs', { games });
  } catch (err) {
    console.log(err);
    res.send('Failed to get all games');
  }
};

module.exports = {
  index,
};