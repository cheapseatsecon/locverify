const express = require('express');

// use process.env variables to keep private variables
require('dotenv').config();

// express middleware
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
let server = "b2pvapds0001"

// dbconnection
var db = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 't3mpP@ss1',
        port: 3306,
        database: 'eud_audit'
    }
});

// controllers
const main = require('./controllers/main')

// app
const app = express()

//app middleware
const whitelist = ['http://' + server + ':8080']
const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('not allowed by CORS'))
        }
    }
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined'))

// app routes
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.get('/crud/:id', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

// app server connection
let PORT = 8082;
app.listen(process.env.PORT || 8082, () => {
    console.log('app is running on port ' + PORT)
})