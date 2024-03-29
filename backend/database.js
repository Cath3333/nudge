require('dotenv').config();

const { MongoClient } = require('mongodb');
const dbName = 'UserInputs';
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

async function fetchAccountData() {
    const db = await connect();
    const collection = db.collection('ProfileInfo');

    try {
        const data = await collection.find({}).toArray(); 
        return data; 
    } finally {
        await client.close();
    }
}

module.exports = { connect, insertAccountData, fetchAccountData};