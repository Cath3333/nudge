// load environment variable from .env file 
if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
  } else {
    require('dotenv').config();
  }
  

// set up mongoDB ... initialize mongodb client with URI 
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
    // then insert document in profileInfo collection 
    try {
        const result = await collection.insertOne({ username: user, password: pass});
        // log number of inserted documents for testing for how many users were added 
        console.log(`${result.insertedCount} documents were inserted`);
    } catch(error) {
        throw new Error(error);
    }
}

async function insertTaskData(name, description, date, time, priority, categories) {
    const db = await connect();
    const collection = db.collection('Tasks');

    try {
        const result = await collection.insertOne({ name: name, desc: description, 
        date: date, time: time, priority: priority, categories: categories});
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}


/**
 * Fetches all account data from the ProfileInfo collection.
 * 
 * @returns {Promise} 
 * @throws {Error} Throws an error if fetching the data fails
 */

// this gives you all the profile data as an array 
// can be used in other parts of interaction 
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


async function close() {
    await client.close();
  }
  
  module.exports = { connect, insertAccountData, fetchAccountData, client, close };
  
