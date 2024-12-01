const { MongoClient } = require('mongodb');

// MongoDB connection URL and database name
const MONGO_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'school';

// Connect to MongoDB and return the database object
async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(MONGO_URL, { useUnifiedTopology: true });
        console.log('Connected to the database');
        return client.db(DATABASE_NAME);
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
}

// Insert students and courses into the database
async function insertData(db) {
    const studentsCollection = db.collection('students');
    const coursesCollection = db.collection('courses');

    await studentsCollection.insertMany([
        { name: 'John', age: 22, major: 'Math' },
        { name: 'Anna', age: 20, major: 'Computer Science' },
        { name: 'Mike', age: 21, major: 'Physics' }
    ]);

    await coursesCollection.insertMany([
        { course_name: 'Database Systems', credit_hours: 4 },
        { course_name: 'Operating Systems', credit_hours: 3 },
        { course_name: 'Artificial Intelligence', credit_hours: 4 }
    ]);

    console.log('Data inserted successfully.');
}

// Query all students
async function queryAllStudents(db) {
    const students = await db.collection('students').find().toArray();
    console.log('All Students:', students);
}

// Query all courses
async function queryAllCourses(db) {
    const courses = await db.collection('courses').find().toArray();
    console.log('All Courses:', courses);
}

// Query a specific student by name
async function queryStudentByName(db, name) {
    const student = await db.collection('students').findOne({ name: name });
    console.log(`Student ${name}:`, student);
}

// Query a specific course by course_name
async function queryCourseByName(db, courseName) {
    const course = await db.collection('courses').findOne({ course_name: courseName });
    console.log(`Course ${courseName}:`, course);
}

// Update a student's major
async function updateStudentMajor(db, name, newMajor) {
    await db.collection('students').updateOne({ name: name }, { $set: { major: newMajor } });
    console.log(`Updated ${name}'s major to ${newMajor}`);
}

// Upsert a student
async function upsertStudent(db, name, data) {
    await db.collection('students').updateOne({ name: name }, { $set: data }, { upsert: true });
    console.log(`Upserted student: ${name}`);
}

// Delete a student
async function deleteStudentByName(db, name) {
    await db.collection('students').deleteOne({ name: name });
    console.log(`Deleted student: ${name}`);
}

// Delete all courses
async function deleteAllCourses(db) {
    await db.collection('courses').deleteMany({});
    console.log('Deleted all courses');
}

// Query students older than a given age
async function queryStudentsOlderThan(db, age) {
    const students = await db.collection('students').find({ age: { $gt: age } }).toArray();
    console.log(`Students older than ${age}:`, students);
}

// Query students with a specific major
async function queryStudentsByMajor(db, major) {
    const students = await db.collection('students').find({ major: major }).toArray();
    console.log(`Students majoring in ${major}:`, students);
}

// Sort and limit query results
async function queryAndSortStudentsByAge(db, limit) {
    const students = await db.collection('students').find().sort({ age: 1 }).limit(limit).toArray();
    console.log(`Sorted students by age (limit ${limit}):`, students);
}

module.exports = {
    connectToDatabase,
    insertData,
    queryAllStudents,
    queryAllCourses,
    queryStudentByName,
    queryCourseByName,
    updateStudentMajor,
    upsertStudent,
    deleteStudentByName,
    deleteAllCourses,
    queryStudentsOlderThan,
    queryStudentsByMajor,
    queryAndSortStudentsByAge
};
