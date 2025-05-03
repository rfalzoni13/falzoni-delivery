const dotenv = require('dotenv')

const appConfiguration = {
    loadConfiguration() {
        if(process.env.NODE_ENV !== undefined) {
            config = dotenv.config({path: `.env.${process.env.NODE_ENV}`})
        } else {
            config = dotenv.config()
        }
    }
}

module.exports = appConfiguration