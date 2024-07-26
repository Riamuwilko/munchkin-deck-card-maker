require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const deckRoutes = require('./routes/decks')
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/decks', deckRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB and listening on port`, process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

