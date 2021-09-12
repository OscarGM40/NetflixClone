const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// routes
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const moviesRoutes = require("./routes/movies.routes")
const listRoutes = require("./routes/list.routes")

//INitializations
const app = express();

// connection
try {
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
} catch (error) {
  console.log(error);
}
mongoose.connection.on("connected", () => {
  console.log(`Connected to ${mongoose.connection.name}`);
});

//Middlewares
app.use(express.json())
app.use(cors())



//Routes
app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/lists", listRoutes);

app.listen(8800, () => {
  console.clear();
  console.log("Backend server on port 8800");
});
