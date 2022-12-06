const express = require("express")
const app = express()
app.use(express.json())
const errorMiddleware = require("./middleware/error")

//Route import
const product = require("./routes/productRoute")

app.use("/api/v1",product);

//Middleware for errors
app.use(errorMiddleware);


module.exports = app;