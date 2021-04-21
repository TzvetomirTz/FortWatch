const path = require('path')
const secureWatchList = require('./utils/secure_watch_list')
const timestamper = require('./utils/timestamper')
const unirest = require('unirest')

const watchListJsonPath = path.join(__dirname, 'watch.json')
secureWatchList.secure(watchListJsonPath)

const monitoring = true

const express = require('express')
const app = express()
const port = 3000

app.get('/health', (req, res) => {
    res.send('The scout is up and running!')
})

app.post('/monitor-start', (req, res) => {
    monitoring = true
})

app.post('/monitor-stop', (req, res) => {
    monitoring = false
})

app.listen(port, () => {
    console.log(`Scout listening at http://localhost:${port}`)
})



function submitToDetective() {
    return new Promise((resolve, reject) => {
        unirest('POST', 'http://localhost:5000/check/')
        .attach('image', '/home/ttzvetkov/Downloads/chuttersnap-qvT_629hapk-unsplash.jpg')
        .end(function (res) { 
            if (res.error) throw new Error(res.error)
            let hmPeopleDetected = parseInt(res.raw_body)

            resolve(hmPeopleDetected)
        })
    })
}

async function monitorCameras() {
    for (let i = 0; i < 5; i++) {
        console.log('looping!')
        let hmPeopleDetected = await submitToDetective()
        console.log(`[ ${timestamper.getTimestamp()} ] Detected ${hmPeopleDetected} people.`)
    }
}

monitorCameras()
