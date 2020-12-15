// const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

// import mongodb driver
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
// const mongo = require('mongodb')

// connection string
const MONGO_url = 'mongodb://localhost:27017'
// const MONGO_USER = process.env.MONGO_USER
// const MONGO_PW = process.env.MONGO_PW
// const MONGO_url = 'mongodb+srv://${MONGO_USER}:${MONGO_PW}@paf-cluster.hgkdz.mongodb.net/<dbname>?retryWrites=true&w=majority'

// create a client - pool
const mongoClient = new MongoClient(MONGO_url,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

const app = express()

// configure environment
app.use(cors())
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb'}))

app.use(morgan('combined'))

app.use(express.static(__dirname + '/dist/frontend'))

app.get('/api/countries', async (req, res) => {
    try {
        const result = await mongoClient.db('mywinemag')
            .collection('winemag')
            .distinct('country') // distinct return as array
        // result.reverse()
        res.status(200)
        res.type('application/json')
        res.json(result)
    } catch (e) {
        res.status(500)
        res.type('application/json')
        res.json({ error: e })
    }
})
// GET /country/:country
app.get("/api/country/:country", async (req, res) => {
    const country = req.params.country

    try {
        const result = await mongoClient.db('mywinemag')
            .collection('winemag')
            .find({
                country: {
                    $regex: country,
                    $options: 'i'
                }
            })
            .project({ title: 1, price: 1 })
            .sort({ province: 1 })
            .limit(20)
            .toArray()

        res.status(200)
        res.type('application/json')
        res.json(result)
    } catch (e) {
        res.status(500)
        res.type('application/json')
        res.json({ error: e })
    }
})

// GET /wine/:wine
app.get("/api/wine/:wine", async (req, res) => {
    const w = req.params.wine
    // const w_id = ObjectId(w)
    // console.log('wine id ---> ', typeof(w), w_id)
    try {
        const result = await mongoClient.db('mywinemag')
            .collection('winemag')
            .find({
                '_id': new ObjectId(w) // no new still works
            })
            .toArray()  
            // if .toArrary() use .find(), without .toArray() use findOne

        res.status(200)
        res.type('application/json')
        res.json(result)
    } catch (e) {
        res.status(500)
        res.type('application/json')
        res.json({ error: e })
    }
})
// start the app
mongoClient.connect()
.then(() => {
    app.listen(PORT, () => {
        console.info(`Application started on port ${PORT} AT ${new Date()}`)
    })
})
.catch(err => {
    console.error(err)
})
