const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const moviesFile = path.join(__dirname, "../../models/movies.json");

// Helper to read movies
function readMovies() {
  if (!fs.existsSync(moviesFile)) fs.writeFileSync(moviesFile, "[]");
  const data = fs.readFileSync(moviesFile);
  return JSON.parse(data);
}

// Helper to save movies
function saveMovies(movies) {
  fs.writeFileSync(moviesFile, JSON.stringify(movies, null, 2));
}

// POST /api/movies/add
router.post("/add", (req, res) => {
  const movies = readMovies();
  const { title, director, year, description } = req.body;

  movies.push({ id: Date.now(), title, director, year, description });
  saveMovies(movies);

  // Redirect to movies list
  res.redirect("/movies");
});

// GET /api/movies (to display all movies)
router.get("/", (req, res) => {
  const movies = readMovies();
  res.render("movies", { movies });
});

module.exports = router;
