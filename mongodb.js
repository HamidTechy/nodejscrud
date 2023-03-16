const {MongoClient} = require('mongodb'); // MongoClient class is a class that allows for making Connections to MongoDB
// const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const database = 'e-comm';
const client = new MongoClient(url);

async function dbconnect()
{
    let result = await client.connect();
    // let db = result.db('e-comm')
    let db = result.db(database);
    return db.collection('products');
       
}
module.exports = dbconnect;