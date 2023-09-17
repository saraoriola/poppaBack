const express = require("express")
const app = express()
const jwt = require ("jsonwebtoken")
const cors = require("cors")

require("dotenv").config()
const PORT = process.env.PORT || 3001 ;


//middleware
app.use(express.json())
app.use(cors())

//url fixed
app.use('/users', require('./routes/users'));

app.listen(PORT, ()=> console.log(`Server created successfully ${PORT}`))