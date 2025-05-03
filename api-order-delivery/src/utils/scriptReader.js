const fs = require('fs')

const scriptReader = {
    order: {
        getAll: function() {
            return fs.readFileSync('./src/db/scripts/order/getAll.sql').toString()
        },
        get: function() {
            return fs.readFileSync('./src/db/scripts/order/get.sql').toString()
        },
        create: function() {
            return fs.readFileSync('./src/db/scripts/order/create.sql').toString()
        },
        update: function() {
            return fs.readFileSync('./src/db/scripts/order/update.sql').toString()
        },
        delete: function() {
            return fs.readFileSync('./src/db/scripts/order/delete.sql').toString()
        }
    }
}

module.exports = scriptReader