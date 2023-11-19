const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require("dotenv").config()


const app = express();
const PORT = process.env.PORT || 5000


// GLOBAL MIDDLEWARES
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))
app.use(morgan("dev"))


// ROUTES
const allRoutes = require("./routes")
app.use("/api/v1", allRoutes)



// CONNECT TO DATABASE
require("./config/database")(() => {
  // START THE SERVER
  app.listen(PORT, () => console.log("Server listening on http://localhost:" + PORT))
})

