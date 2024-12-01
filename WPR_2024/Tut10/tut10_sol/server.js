const express = require('express');
const { MongoClient } = require('mongodb');

// MongoDB connection URL and database name
const MONGO_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'school';

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(MONGO_URL, { useUnifiedTopology: true });
        console.log('Connected to the database');
        return client.db(DATABASE_NAME);
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        throw err; // Re-throw the error to be caught in API calls
    }
}

// API to add a student
app.post('/students', async (req, res) => {
    const { name, age, major } = req.body;

    // Validate request body
    if (!name || !age || !major) {
        return res.status(400).json({ message: 'Name, age, and major are required.' });
    }

    try {
        const db = await connectToDatabase();
        const result = await db.collection('students').insertOne({ name, age, major });
        res.status(201).json({
            message: 'Student added successfully',
            studentId: result.insertedId 
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add student', error: err.message });
    }
});

// API to add a course
app.post('/courses', async (req, res) => {
    const { course_name, credit_hours } = req.body;

    // Validate request body
    if (!course_name || !credit_hours) {
        return res.status(400).json({ message: 'Course name and credit hours are required.' });
    }

    try {
        const db = await connectToDatabase();
        const result = await db.collection('courses').insertOne({ course_name, credit_hours });
        res.status(201).json({
            message: 'Course added successfully',
            courseId: result.insertedId // Return the _id of the new course
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add course', error: err.message });
    }
});

// API to retrieve all students
app.get('/students', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const students = await db.collection('students').find().toArray();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve students', error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
