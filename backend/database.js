// load environment variable from .env file 
if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
  } else {
    require('dotenv').config();
  }
  

const { MongoClient } = require('mongodb');
const dbName = 'FormInputs';
const client = new MongoClient(process.env.MONGODB_URI);


async function connect() {
    try {
        await client.connect();
        console.log('Connected');
        const db = client.db(dbName);
        return db;
    } catch (err) {
        console.error('Failed to connect', err);
        process.exit(1);
    }
}

/**
 * Inserts a new account document into the ProfileInfo collection.
 * 
 * @param {string} user Account's username
 * @param {string} pass  Accounts's password
 * @returns {Promise} 
 * @throws {Error} Throws an error if the username already exists or if the insert fails
 */

// take in username and password, connect to database
async function insertAccountData(user, pass) {
    const db = await connect();
    const collection = db.collection('ProfileInfo');
    const existing = await collection.findOne({ username: user });

    if (existing) {
        throw new Error('Username already exists');
    }

    try {
      
        const result = await collection.insertOne({ username: user, password: pass });
        if (result.acknowledged) {
            console.log("Insertion successful, ID:", result.insertedId);
            return result.insertedId; 
        } else {
            throw new Error('Insertion failed');
        }
    } catch (error) {
        console.error("Error inserting account data:", error);
        throw new Error(error.message); 
    }
}


async function insertTaskData(userId, name, description, date, time, priority, location, completed = false) {
    const db = await connect();
    const collection = db.collection('TasksCollection');

    try {
        const creationDate = new Date().toISOString(); // Capture the current date and time
        const result = await collection.insertOne({
            user_id: userId,
            name: name,
            desc: description,
            date: date,
            time: time,
            priority: priority,
            location: location,
            completed: completed,
            creation_date: creationDate
        });
        return result;
    } catch(error) {
        throw new Error(error);
    }
}



/**
 * Fetches all account data from the ProfileInfo collection.
 * 
 * @returns {Promise} 
 * @throws {Error} Throws an error if fetching the data fails
 */


async function fetchAccountData() {
    const db = await connect();
    const collection = db.collection('ProfileInfo');

    try {
        const data = await collection.find({}).toArray(); 
        return data; 
    }  catch (error) {
        throw new Error(error);
    }
}

async function fetchTaskData() {
    const db = await connect();
    const collection = db.collection('TasksCollection');

    try {
        const data = await collection.find({}).toArray(); 
        return data; 
    }  catch (error) {
        throw new Error(error);
    }
}


async function close() {
    await client.close();
  }
  
  module.exports = { connect, insertTaskData, fetchTaskData, insertAccountData, fetchAccountData, client, close };
  
