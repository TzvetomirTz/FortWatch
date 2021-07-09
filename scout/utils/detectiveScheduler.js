const request = require('request');
const fs = require('fs');

const timestamper = require('./timestamper')

const schedulePerpetually = function(subscriber) {
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
        if (error) throw new Error(error)

        hmPeopleDetected = response.body
        console.log("People detected: " + hmPeopleDetected + " at: " + timestamp + " from camera with MAC: " + cameraMacAddress)

        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await delay(1000) /// waiting 1 second.

        schedulePerpetually(subscriber) // Again and again as soon as the node is ready to take a new sample.
        //Recursion in js should be avoided. So in the future replace with an infinite loop that breaks on lack of response from the node.
      })
}

exports.schedulePerpetually = schedulePerpetually
