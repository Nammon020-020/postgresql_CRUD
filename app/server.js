const express = require('express')
const cores =  require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
require('dotenv')

const port = process.env.PORT || 3000
const app = express()

app.use(cores())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
routes(app)

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
    console.log('localhost3000')
})

app.use((req,res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
})