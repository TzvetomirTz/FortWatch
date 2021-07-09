const fs = require('fs')
const express = require('express')
const request = require('request');

const timestamper = require('./utils/timestamper')
const detectiveScheduler = require('./utils/detectiveScheduler')

const app = express()
const port = 3000

app.use(express.json())

app.get('/health', (req, res) => {
    res.send('The scout is up and running!')
})

app.post('/subscribe_for_samples', (req, res) => {
    const newDetectiveNode = req.body.host + ":" + req.body.port
    detectiveScheduler.scheduleSample(newDetectiveNode)// before that do a health check!
    
    res.send("Subscribed node " + newDetectiveNode + " for samples successfully!")
})



app.listen(port, () => {
    console.log(`Scout listening at http://localhost:${port}`)
})
