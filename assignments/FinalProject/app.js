const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// EJS SETUP
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ROUTES
app.use("/api/users", require("./routes/api/users"));
app.use("/api/movies", require("./routes/api/movies"));

// LOAD MOVIES FUNCTION
const fs = require("fs");
function readMovies() {
    const p = path.join(__dirname, "models/movies.json");
    if (!fs.existsSync(p)) fs.writeFileSync(p, "[]");
    return JSON.parse(fs.readFileSync(p));
}

// PAGES
app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

// All movies list
app.get("/movies", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const movies = readMovies();
    res.render("movies", { movies });
});

// Single movie details page
app.get("/movies/:id", (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const movies = readMovies();
    const movie = movies.find(m => m.id == req.params.id);

    if (!movie) return res.send("Movie not found");

    // Check if user already reviewed
    const userReviewed = movie.reviews.some(r => r.username === req.session.user.username);

    res.render("movieDetails", { movie, userReviewed });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;
