const router = require("express").Router();
const Movie = require("./../models/Movie");
const verify = require("../middlewares/verifyToken");
const { sign } = require("jsonwebtoken");

// CREATE A NEW MOVIE ** Solo puede un Admin **
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ error: "You are not allowed to create a movie" });
  }
});

// UPDATE A MOVIE * Solo el Admin *
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      //  puedo hacerlo sin $set
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ error: "You are not allowed to update a movie" });
  }
});

// DELETE A MOVIE * Solo el Admin *
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "The movie has been deleted..." });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ error: "You are not allowed to delete a movie" });
  }
});

// GET A MOVIE * Cualquier usuario pero autenticado *
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET RANDOM MOVIE * Cualquier usuario pero autenticado *
// Puede venir el type en la query => /random?type=
// fijate que random a secas será una pelicula y random?type=series una serie.
// Solo hay estas dos opciones
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET ALL MOVIES * Solo el Admin * Devuelve el array.reverse() de peliculas(la más reciente creada primero)
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find({});
      res.status(200).json(movies.reverse());
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json({ error: "You are not allowed to delete a movie" });
  }
});

module.exports = router;
