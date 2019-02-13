require('dotenv').config()
const express = require('express')
const route = require('./route/index')
const cors = require('cors')
const app = express()
const port = 3000
const logger = require('morgan')


const mongoose = require('mongoose')
const databaseName = 'miniwp'
const db = mongoose.connection
mongoose.connect(`mongodb://localhost:27017/${databaseName}`, {useNewUrlParser : true})
mongoose.set('useCreateIndex', true)
db.on('error', console.error.bind(console, 'conection err:'))
db.once('open', function() {})

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use('/', route)

app.listen(port, function() {
  console.log(`this is port ${port}...`)
})