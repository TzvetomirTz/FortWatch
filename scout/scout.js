const accessCams = require('./camera-management/access_cameras')

const goScout = function() {
    let allCams = accessCams.getAllLocalCameras()

    allCams.then((cams) => {console.log(cams)})

}

goScout()

exports.goScout = goScout