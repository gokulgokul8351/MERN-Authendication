const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv").config();
const dbConnection = require('./db')
const app = express();
const userRouter = require('./routes/user.routes')

// DB connection
dbConnection()

// middlweares
app.use(express.json());
app.use(cors());

// routes
app.use('/api', userRouter)


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
