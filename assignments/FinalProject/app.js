const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve CSS, JS, Images
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ----- ROUTE IMPORTS -----
const movieRoutes = require("./routes/api/movies");

// ----- ROUTE USE -----
app.use("/api/movies", movieRoutes);
app.use("/api/users", require("./routes/api/users"));


// ROUTES (can add more later)
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/movies', (req, res) => {
    const movies = require('./models/movies.json'); // get all movies
    res.render('movies', { movies });
});

app.get("/add-movie", (req, res) => {
    res.render("addMovie");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;