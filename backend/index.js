if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
  } else {
    require('dotenv').config();
  }
  
  const express = require('express');
  const path = require('path');
  const database = require('./database');
  
  const app = express();
  app.use(express.json()); //access request body as json
  
  // use cors middleware to allow frontend to communicate with backend
  const cors = require('cors');
  const corsOptions = {
    origin: 'http://localhost:3000', 
  };
  
  app.use(cors(corsOptions));
  
  
  app.post('/sign-up', async (req, res) => {
    const {username, password} = req.body; 
    try {
      await database.insertAccountData(username, password); 

      return res.status(200).json({message: "Successfully registered user." })
    } catch (error) {
      if (error.message === 'Username already exists') {
        return res.status(400).send('Username already exists.');
      }
      console.error('Error inserting data:', error);
      return res.status(500).send('Failed to insert data.');
    }
  });
  
  app.post('/login', async(req, res) => {
    const {username, password} = req.body; 
  
    try { 
    let allData = await database.fetchAccountData();
    console.log("alldata:", allData); // retrieve all users currently in database
    // retrieve the username and password in the database that matches the request user 
    const user = allData.find(u => u.username === username && u.password === password);
  
    if (!user) { 
      return res.status(401).send({message: "Invalid username or password."})
    }
  
  
    return res.status(200).send({message: "User successfully logged in."});
    
    } catch (error) {
    console.error('Login error:', error);
    if (!res.headersSent) {
      return res.status(500).send({ message: "Login failed." }); 
    }
    }
  })
  
  
  
  app.use(express.static(path.join(__dirname, '../nudge-app/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../nudge-app/build/index.html'));
  });
  
  
  
  
  module.exports = app;
  
  
  
  
  
  
  
  
  