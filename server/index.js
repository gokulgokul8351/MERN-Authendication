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

module.exports = app;







// JEST test cases
// This line of code use only testing purpose and should be removed in production mode...!!!


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv").config();
// const dbConnection = require("./db");
// const userRouter = require("./routes/user.routes");

// const app = express();

// // 👇 Only connect to DB if not in test mode
// if (process.env.NODE_ENV !== "test") {
//   dbConnection();
// }

// app.use(express.json());
// app.use(cors());
// app.use("/api", userRouter);

// const port = process.env.PORT || 8080;
// if (process.env.NODE_ENV !== "test") {
//   app.listen(port, () => console.log(`Server running on port ${port}`));
// }

// module.exports = app; // ✅ for Jest tests
