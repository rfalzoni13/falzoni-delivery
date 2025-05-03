const log = require('../utils/log')

const middlewares = {
  notFound: function (req, res, next) {
    statusCode = 404
    log.error('Método ou serviço não encontrado')
    const error = { status: statusCode, message: 'Método ou serviço não encontrado' }
    next(error)
  },

  errorHandler: function (err, req, res, next) {
    if (err.stack !== undefined) {
      log.error(err.stack)
    }
    res.status(err.status || 400)
    res.json({
      status: res.statusCode,
      message: err.message
    })
  }
}

module.exports = middlewares
