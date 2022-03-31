// import modules && variables
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const app = express();
const PORT = process.env.PORT || 8080;
const connectMongoDB = require("./config/mongo/mongoConnect");

// db

connectMongoDB();

// middlewares
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

// routes

app.use("/users", require("./routes/user"));

// error handling middleware
app.use(globalErrorHandler);

// port
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
