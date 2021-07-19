const request = require('request');
const fs = require('fs');

const timestamper = require('./timestamper')

const schedulePerpetually = function(subscriber) {
    let continueSubscription = false

    do {
        const timestamp = timestamper.getTimestamp()
        const cameraMacAddress = "12:a3:4b:56:78:c9"
        let hmPeopleDetected

        const options = {
            'method': 'POST',
            'url': 'http://localhost:5000/check/',
            'headers': {
            },
            formData: {
                'image': {
                    'value': fs.createReadStream('/home/ttzvetkov/Downloads/intruders.jpg'),
                    'options': {
                    'filename': 'intruders.jpg',
                    'contentType': null
                    }
                }
            }
        }

        request(options, function (error, response) {
            if (error) {
                console.log("Subscription of detective node " + subscriber + " terminated with error: " + error)
                continueSubscription = false // <------------- Breaks subscription
                return
            }

            hmPeopleDetected = response.body
            console.log("People detected: " + hmPeopleDetected + " at: " + timestamp + " from camera with MAC: " + cameraMacAddress)

            schedulePerpetually(subscriber)
        })
    } while (continueSubscription)
}

exports.schedulePerpetually = schedulePerpetually
