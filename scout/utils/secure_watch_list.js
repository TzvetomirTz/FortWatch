const fs = require('fs')
const path = require('path')

const secure = function(jsonPath) {
    if (fs.existsSync(jsonPath)) {
        console.log('Watch list JSON is present. The watch list will be determined by its content.')
    } else {
        console.log('Watch list JSON is not present. Creating a new one...')
        
        fs.writeFileSync(jsonPath, JSON.stringify({}))
    }
}

exports.secure = secure
