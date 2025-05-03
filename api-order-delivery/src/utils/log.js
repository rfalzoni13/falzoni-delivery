const dateUtil = require('./dateUtil')

const log = {
    info: (message) => console.log("\x1b[36m%s\x1b[0m", `[${dateUtil.getDate()}] [INFO] ${message}`),
    success: (message) => console.log("\x1b[32m%s\x1b[0m", `[${dateUtil.getDate()}] [SUCCESS] ${message}`),
    warning: (message) => console.warn("\x1b[33m%s\x1b[0m", `[${dateUtil.getDate()}] [WARNING] ${message}`),
    error: (message) => console.error("\x1b[31m%s\x1b[0m", `[${dateUtil.getDate()}] [ERROR] ${message}`)
}

module.exports = log