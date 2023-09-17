const express = require("express");
const cors = require("cors");

const app = express();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3001;

require("dotenv").config();

//NOTE: middleware
app.use(cors());
app.use(express.json());


//url fixed
app.use('/users', require('./routes/users'));

app.use("/events", require("./routes/events"));

app.listen(PORT, () => console.log(`Server created successfully ${PORT}`));

module.exports = app;

