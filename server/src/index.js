require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 4000
const cors = require('cors')
const connectDB = require('./config/dbConnect')
const mongoose = require('mongoose')

connectDB()

app.use(cors())
app.use(express.json()) // middleware to parse json
// app.use(cookieParser())

// static route
app.use('/', express.static(path.join(__dirname, '/public')))

// article routes
app.use('/api/articles', require('./routes/articleRoutes'))

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})

module.exports = app
