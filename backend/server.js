require('dotenv').config()

const express = require('express')
const deckRoutes = require('./routes/decks')
const app = express()

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/decks', deckRoutes)

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port`, process.env.PORT)
})