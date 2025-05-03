const moment = require("moment")

const dateUtil = {
    getDate() {
        return moment().format("YYYY-MM-DD HH:mm:ss")
    }
}

module.exports = dateUtil