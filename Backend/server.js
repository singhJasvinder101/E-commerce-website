const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const apiRoutes = require("./routes/apiRoutes")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const cors = require('cors');

console.log(process.argv)
// middleware to recognize the body by express like json, cookie
app.use(express.json())
app.use(fileUpload())
app.use(cookieParser())
app.use(cors()); // Enable CORS for all routes

const mongoDB = require("./config/db")
mongoDB()

app.get('/', async (req, res) => {
    res.status(200).send("product id")
})

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        console.log(error)
    }
    next(error)
})

// our nect(error) middle ware directly point to the server custom error 
// enpointless handler of errror or middleware
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    } else {
        res.status(500).json({
            message: error.message
        })
    }
})

app.listen(port, () => {
    console.log(`started at http://localhost:${port}`)
})