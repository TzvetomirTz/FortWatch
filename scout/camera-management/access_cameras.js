const find = require('local-devices') // requires installed net-tools locally. sudo apt install net-tools

let allCameraMacs = []

const getAllLocalCameras = function() {
    return getAllLocalDevices().then(result => {return result.filter(filterDevices)})
}

const getAllLocalDevices = function() {
    return new Promise((resolve, reject) => {
        find().then(allLocalDevices => {
            resolve(allLocalDevices)
        })
    })
}

const filterDevices = function(devices) { //Rethink whether to check MAC address instead of IP
                                        // Make a file with all the MACs of previously seen devices in the local net
                                        // Label devices to know whether they are cams or not.
                                        // All new devices will pass a check, be labeled and added in the list file
                                        // Known cameras will will be stored in the list file with their brand as each brand offers different API

    //determine if the ip belongs to a HikVision camera by checking http://ip_address_of_the_device/IO/outputs/1/status/
    return true //for now
}

exports.getAllLocalCameras = getAllLocalCameras
