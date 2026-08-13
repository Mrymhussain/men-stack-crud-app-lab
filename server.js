const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

dotenv.config();

const app = express(); 

//Middleware
app.use(express.urlencoded({extended: false}));
app.use (methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//Connect to MongoDB 
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
  
//Import the Game model 
const Game = require('./models/game.js');
const { error } = require('console');

//Home page
app.get('/',(req,res)=>{
    res.render('index.ejs');
});

//Show all games 
app.get('/games',async(req,res)=>{
    try {
        const games = await Game.find();
        res.render('games/index.ejs', {games});
    } catch (error) {
        console.log(error);
        res.send('Fail to get all games');
        
    }

});

//Show all games 
app.get('/games', async (req,res) => {
    try {
        const games = await Game.find();
        res.render('games/index.ejs', {games});
    } catch(error) {
        console.log(error);
        res.send('Failed to get all games');
    }
});

//Show create game form 
app.get('/games/new', (req,res)=>{
    res.render('games/new.ejs');
});

//Create a new game 
app.post('/games', async(req,res)=>{
    try {
        await Game.create(req.body);

        res.redirect('/games');
    } catch (error) {
        console.log(error);
        res.send('Failed to create game');
        
    }
});

// Show one game
app.get('/games/:id', async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
  
      res.render('games/show.ejs', { game });
    } catch (error) {
      console.log(error);
      res.send('Failed to fetch the game');
    }
  });

// Delete a game
app.delete('/games/:gameId', async (req, res) => {
    try {
      await Game.findByIdAndDelete(req.params.gameId);
  
      res.redirect('/games');
    } catch (error) {
      console.log(error);
      res.send('Unable to delete game');
    }
  });
  
  // Show edit game form
  app.get('/games/:gameId/edit', async (req, res) => {
    try {
      const foundGame = await Game.findById(req.params.gameId);
  
      res.render('games/edit.ejs', {
        game: foundGame,
      });
    } catch (error) {
      console.log(error);
      res.send('Unable to find game');
    }
  });

  // Update a game
app.put('/games/:id', async (req, res) => {
    try {
      await Game.findByIdAndUpdate(req.params.id, req.body);
  
      res.redirect(`/games/${req.params.id}`);
    } catch (error) {
      console.log(error);
      res.send('Unable to update game');
    }
  });
  
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
