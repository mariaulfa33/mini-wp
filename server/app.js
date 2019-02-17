require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const databaseName = 'ketiktak'
const db = mongoose.connection
mongoose.connect(`mongodb://${process.env.database}/${databaseName}`, {useNewUrlParser : true})
mongoose.set('useCreateIndex', true)
db.on('error', console.error.bind(console, 'conection err:'))
db.once('open', function() {})

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())


app.use('/', routes)

app.listen(port, function() {
  console.log(`this is port ${port}...`)
})