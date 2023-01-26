const routes = require("express").Router()
const controller = require("../controllers/contacts")

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get("/", controller.getAll)

routes.get("/:id", controller.getSingle)

routes.post("/", controller.addContact)

routes.put("/:id", controller.updateContact)

routes.delete("/:id", controller.deleteContact)

module.exports = routes