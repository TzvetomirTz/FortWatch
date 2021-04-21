const luxon = require('luxon')

const getTimestamp = function() {
    return luxon.DateTime.local().toISO().substr(0, 19)
}

exports.getTimestamp = getTimestamp
