const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes')
const middlewares = require('./middlewares')
const log = require('./utils/log')
const appConfiguration = require('./utils/appConfiguration')
const cors = require('cors')

appConfiguration.loadConfiguration()

log.info("Configurando o servidor")
const app = express()
const port = process.env.port

app.use(bodyParser.json())
app.use(express.json())

// Configure CORS
log.info("Configurando o CORS")
app.use(cors())

// Load routes and
log.info("Carregando rotas")
app.use('/api', router)

// Middlewares
log.info("Carregando middlewares")
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const server = app.listen(port, () => {
    log.success(`Aplicação iniciou na porta ${port}`)
})

process.on('SIGTERM', () => shutdown())
process.on('SIGINT', () => shutdown())
process.on('SIGKILL', () => shutdown())
process.on('SIGQUIT', () => shutdown())
process.on('SIGHUP', () => shutdown())

function shutdown() {
    server.close((_) => {
        log.warning(`Encerrando servidor...`)
    })
}