const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
// mongoose
// const mongoose = require('mongoose')

const app = express()

const feedRoutes = require('./routes/feed')


// app.use(bodyParser.urlencoded()) // x-www-form-urlencoded
app.use(bodyParser.json()) // application/json
app.use('/images', express.static(path.join(__dirname, 'images')))

// handle cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/feed', feedRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.messsage
    res.status(status).json({message:message})
})

mongoose.connect('link').then(result => {app.listen(8080)}).catch(err => console.log(err))
// app.listen(8080)