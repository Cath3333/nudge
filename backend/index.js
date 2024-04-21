if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const database = require('./database');
const cors = require('cors');

const app = express();


const corsOptions = {
  origin: 'http://localhost:3000', 
};

//app.use(cors(corsOptions));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// root endpoint route
app.get('/', (_req, resp) => {
  resp.json({ message: 'hello, deployment is active' });
});


app.post('/sign-up', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
  }

  try {
      const insertedId = await database.insertAccountData(username, password);
      return res.status(201).json({ message: "Successfully registered user.", userId: insertedId.toString() });
  } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ message: "Failed to register user.", error: error.message });
  }
});



app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request with body:", req.body);
  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
  }

  try {
      let allData = await database.fetchAccountData();
      const user = allData.find(u => u.username === username && u.password === password);

      if (!user) {
          return res.status(401).json({ message: "Invalid username or password." });
      }

     
      return res.status(200).json({ message: "User successfully logged in.", userId: user._id.toString() });
  } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: "Login failed." });
  }
});


app.post('/add-task', async (req, res) => {
  const { userId, name, description, datetime, priority, location } = req.body;

  if (!userId || !name || !datetime || !priority) {
      return res.status(400).json({ message: "Missing required fields" });
  }

  try {
      const result = await database.insertTaskData(userId, name, description, datetime, priority, location);
      res.status(201).json({ message: "Task successfully added", insertedId: result.insertedId });
  } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: "Failed to add task." });
  }
});

app.post('complete-task', async (req, res) => {
  const {taskId} = req.body;
  if (!taskId) {
    return res.status(400).json({ message: "Missing task id" });
  }

  try {

  } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: "Failed to add task." });
  }


});



//tester endpoint, feel free to delete
app.get('/accounts-data', async (_req, res) => {
  try {
    const data = await database.fetchAccountData(); 
    res.json(data);
  } catch (error) {
    console.error('Error inserting sample data:', error);
    res.status(500).send('Failed to insert sample data', error);
  }
});

app.get('/analytics', async (_req, res) => {
  try {
    //analytics: (1) 
    //1. high traffic days when assignments are due so users can plan ahead
    // 2. count items user have completed over a time period (heatmap like github contributions)

    //notes: heat map for task due (high traffic days) and completed tasks 
    //general analytics dashboard for items compelte rate (on time) over the past week, number of urgent items

    // const data = await database.fetchAccountData(); 
    // res.json(data);
    // format: [category: {}, category: {}, category: {}]

    //without datatype processing : just split by '/', dd/mm/yyyy (note format) --> kinda annoying to aggregate

    //two functions: #1. fetch high traffic days for (1) future (2) completed (take in a param of type)
    // #2. general statistics (complete rate, etc) (need multiple queries, one for each item)
 
    //data: when check box (complete a task), update the 'compelte time' field in the database
    
  } catch (error) {
    console.error('Error inserting sample data:', error);
    res.status(500).send('Failed to insert sample data', error);
  }
})


app.use(express.static(path.join(__dirname, '../zuss-app/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../zuss-app/build/index.html'));
});




module.exports = app;
