const db = require('../db').promise()
const log = require('../utils/log')
const scriptReader = require('../utils/scriptReader')

const orderData = {
    getAll: async function() {
        try {
            const sql = scriptReader.order.getAll()
            const [result, _] = await db.query(sql)
            return result
        } catch(err) {
            log.error(`Ocorreu o seguinte erro: ${err.message}`)
            throw err
        }
    },
    get: async function(id) {
        try {
            const sql = scriptReader.order.get()
            const [result, _] = await db.query(sql, [id])
            return result[0]
        } catch(err) {
            log.error(`Ocorreu o seguinte erro: ${err.message}`)
            throw err
        }
    },
    create: async function(obj) {
        try {
            await db.beginTransaction()
            const sql = scriptReader.order.create()
            await db.execute(sql, [obj.name, obj.price, obj.quantity, obj.unity])
            await db.commit()
        } catch(err) {
            await db.rollback()
            log.error(`Ocorreu o seguinte erro: ${err.message}`)
            throw err
        }
    },
    update: async function(obj) {
        try {
            await db.beginTransaction()
            const sql = scriptReader.order.update()
            await db.execute(sql, [obj.name, obj.price, obj.quantity, obj.unity, obj.id])
            await db.commit()
        } catch(err) {
            await db.rollback()
            log.error(`Ocorreu o seguinte erro: ${err.message}`)
            throw err
        }
    },
    delete: async function(id) {
        try {
            await db.beginTransaction()
            const sql = scriptReader.order.delete()
            await db.execute(sql, [id])
            await db.commit()
        } catch(err) {
            await db.rollback()
            log.error(`Ocorreu o seguinte erro: ${err.message}`)
            throw err
        }
    }
}

module.exports = orderData