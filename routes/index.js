const routes = require("express").Router()

routes.get('/', (req, res) => {
    res.send('Alan Wangsgard')
  })

  module.exports = routes