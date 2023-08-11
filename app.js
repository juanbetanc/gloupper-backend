// Utilizar funcionalidades del Ecmascript 6
"use strict";
// Cargamos los módulos de express y body-parser
var express = require("express");
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require('./swagger')

var bodyParser = require("body-parser");
// Llamamos a express para poder crear el servidor
var app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importamos las rutas
var user_routes = require("./routes/user");
var microBusiness_routes = require("./routes/microBusiness");
var categories_routes = require("./routes/categories");
var services_routes = require("./routes/services");
const fileUpload = require("express-fileupload");

//cargar middlewares
//un metodo que se ejecuta antes que llegue a un controlador
//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cors({
    origin: '*'
}))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Cargamos las rutas

app.use("/api", user_routes);
app.use("/api", microBusiness_routes);
app.use("/api", categories_routes);
app.use("/api", services_routes);

// exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;
