const orderData = require('../data/order')

const orderService = {
    getAll: async function() {
        return await orderData.getAll()
    },
    get: async function(id) {
        return await orderData.get(id)
    },
    create: async function(obj) {
        return await orderData.create(obj)
    },
    update: async function(obj) {
        await orderData.update(obj)
    },
    delete: async function(id) {
        return await orderData.delete(id)
    }
}

module.exports = orderService