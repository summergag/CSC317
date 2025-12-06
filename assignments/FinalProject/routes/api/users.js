const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../../models/users.json');

// Helper to read users
function readUsers() {
    if (!fs.existsSync(usersFile)) return [];
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
}

// Helper to write users
function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// REGISTER
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const users = readUsers();

    // Check if email exists
    if (users.find(user => user.email === email)) {
        return res.send('Email already registered');
    }

    users.push({ username, email, password });
    writeUsers(users);

    // Redirect to login page after registration
    res.redirect('/login');
});

// LOGIN (simplified)
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.send('Invalid email or password');

    // For now, just redirect to movies page
    res.redirect('/movies');
});

module.exports = router;
