// Importing required modules
const express = require('express');
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const path = require("path");

// Initializing the Express application
const app = express();

// Setting the port from environment variables or default to 3000
const port = process.env.PORT || 3000;

// Connecting to the database
connectDB();

// Middleware to parse URL-encoded bodies and JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for handling errors
app.use(errorHandler);

// Setting EJS as the template engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views/"));

// Routing
app.use("/", require('./routes/route'));


// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on localhost:${port}/login`);
});