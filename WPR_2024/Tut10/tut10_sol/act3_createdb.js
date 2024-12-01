const { MongoClient } = require('mongodb');

// MongoDB connection URL and database name
const MONGO_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'books_db';

// Connect to MongoDB and return the database object
async function connectToDatabase() {
    const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    try {
        await client.connect();
        console.log('Connected to the database');
        return client;
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
}

// Insert books into the database
async function insertData(db) {
    try {
        const booksCollection = db.collection('books');

        await booksCollection.insertMany([
            {
              title: "MongoDB Guide",
              tag: ["mongodb", "guide", "database"],
              n: 100,
              review_score: 4.3,
              price: [
                { v: 19.99, c: "€", country: "IT" },
                { v: 18, c: "£", country: "UK" }
              ],
              author: {
                _id: 1,
                name: "Mario",
                surname: "Rossi"
              }
            },
            {
              title: "Developing with Python",
              tag: ["python", "guide", "programming"],
              n: 352,
              review_score: 4.6,
              price: [
                { v: 24.99, c: "€", country: "IT" },
                { v: 19.49, c: "£", country: "UK" }
              ],
              author: {
                _id: 2,
                name: "John",
                surname: "Black"
              }
            }
          ]);

        console.log('Data inserted successfully.');
    } catch (err) {
        console.error('Error inserting data:', err);
    }
}

// Main function to run the program
async function main() {
    let client;
    try {
        client = await connectToDatabase();
        const db = client.db(DATABASE_NAME);
        await insertData(db);
    } catch (err) {
        console.error('Error in main function:', err);
    } finally {
        if (client) {
            await client.close();
            console.log('Database connection closed.');
        }
    }
}

// Run the main function
main();
