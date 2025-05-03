const orderRouter = require('express').Router()
const orderService = require('../services/order')
const log = require('../utils/log')

orderRouter.get("/", function (req, res, next) {
    log.info(`Obtendo requisição - endereço: ${req.originalUrl}`)    
    orderService.getAll()
    .then((result) => {
        return res.json(result)
    })
    .catch((e) => {
        log.error(`Requisição retornou um erro: ${JSON.stringify(e)}`)
        next(e)
    })
})

orderRouter.get("/:id", function (req, res, next) {
    log.info(`Obtendo requisição - endereço: ${req.originalUrl}`)    
    orderService.get(req.params.id)
    .then((result) => {
        return res.json(result)
    })
    .catch((e) => {
        log.error(`Requisição retornou um erro: ${JSON.stringify(e)}`)
        next(e)
    })
})

orderRouter.post("/", function (req, res, next) {
    log.info(`Obtendo requisição - endereço: ${req.originalUrl}`)    
    orderService.create(req.body)
    .then(() => {
        return res.status(201).send("Registro inserido com sucesso!")
    })
    .catch((e) => {
        log.error(`Requisição retornou um erro: ${JSON.stringify(e)}`)
        next(e)
    })
})

orderRouter.put("/", function (req, res, next) {
    log.info(`Obtendo requisição - endereço: ${req.originalUrl}`)    
    orderService.update(req.body)
    .then(() => {
        return res.send("Registro atualizado com sucesso!")
    })
    .catch((e) => {
        log.error(`Requisição retornou um erro: ${JSON.stringify(e)}`)
        next(e)
    })
})

orderRouter.delete("/:id", function (req, res, next) {
    log.info(`Obtendo requisição - endereço: ${req.originalUrl}`)
    orderService.delete(req.params.id)
    .then(() => {
        return res.send("Registro removido com sucesso!")
    })
    .catch((e) => {
        log.error(`Requisição retornou um erro: ${JSON.stringify(e)}`)
        next(e)
    })
})

module.exports = orderRouter