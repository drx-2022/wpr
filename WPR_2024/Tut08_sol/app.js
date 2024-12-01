// app.js
const express = require('express');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {encryptText,decryptText} = require('./cryptoExerciseVer02/crytoModule')

const app = express();
const PORT = 3000;
const keyCrypto = "mypassword123456";
// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// Set EJS as the view engine
app.set('view engine', 'ejs'); 

// Load user data from JSON file
const usersDataPath = path.join(__dirname, 'users.json');

const loadUsers = () => {
    const data = fs.readFileSync(usersDataPath);
    return JSON.parse(data);
};

// Login GET Endpoint
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Login POST Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.render('login', { error: 'User not found!!' });
    }
    if (user.password !== password) {
        return res.render('login', { error: 'Wrong password' });
    }

    // If login is successful
    
    const encryptedUserId = encryptText(user.id,keyCrypto);
    res.cookie('user', encryptedUserId); // Set the cookie
    res.redirect('/profile');
});

// Profile GET Endpoint
app.get('/profile', (req, res) => {
    const userId = req.cookies.user ? decryptText(req.cookies.user,keyCrypto) : null;
    const users = loadUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.redirect('/login'); // Redirect to login if no user found
    }

    res.render('profile', { user });
});

app.get('/logout', (req, res) => {
    res.clearCookie('user'); // delete cookie user
    res.redirect('/login'); // direct to login page
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
