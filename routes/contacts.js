const routes = require("express").Router()
const controller = require("../controllers/contacts")
const {addContactValidation} = require("../validation/validation")

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));


routes.get("/", controller.getAll)

routes.get("/:id", controller.getSingle)

routes.post("/", addContactValidation ,controller.addContact)

routes.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

routes.put("/:id", controller.updateContact)

routes.delete("/:id", controller.deleteContact)

module.exports = routes