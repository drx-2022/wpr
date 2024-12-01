const dbOperations = require('./dbOperations');

(async function () {
    const db = await dbOperations.connectToDatabase();

    // Insert data
    await dbOperations.insertData(db);

    // Query all students and courses
    await dbOperations.queryAllStudents(db);
    await dbOperations.queryAllCourses(db);

    // Query specific student and course
    await dbOperations.queryStudentByName(db, 'Anna');
    await dbOperations.queryCourseByName(db, 'Database Systems');

    // Update student major and upsert a new student
    await dbOperations.updateStudentMajor(db, 'John', 'Statistics');
    await dbOperations.upsertStudent(db, 'Tom', { name: 'Tom', age: 23, major: 'Biology' });

    // Delete a student and all courses
    await dbOperations.deleteStudentByName(db, 'Mike');
    await dbOperations.deleteAllCourses(db);

    // Advanced querying
    await dbOperations.queryStudentsOlderThan(db, 20);
    await dbOperations.queryStudentsByMajor(db, 'Computer Science');

    // Sorting and limiting
    await dbOperations.queryAndSortStudentsByAge(db, 2);
})();
