"use strict";

const cors = require("cors");
// Cargamos el módulo de express para poder crear rutas
var express = require("express");
// Cargamos el controlador
var UserController = require("../controllers/UsersControllers/user");
var ServicesController = require("../controllers/UsersControllers/hiredService");
const validateToken = require("../helpers/validateToken");

var corsOptions = {
  origin: "*",
  optionsSuccesStatus: 200,
};
// Llamamos al router
var api = express.Router();
var md_auth = require("../middlewares/authenticated");
// Creamos una ruta para los métodos que tenemos en nuestros controladores
//api.get('/login', md_auth.ensureAuth, UserController.login);

// USUARIO

/**
 * @swagger
 * /api/validate-token:
 *      post:
 *          summary: Endpoint para validar el token de acceso
 *          responses:
 *              200:
 *                  description: token
 *          parameters: [
 *              {
 *                  "in": "header",
 *                  "name": "authorization",
 *                  "description": "Token de sesion del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },
 *          ]
 *
 *
 */
api.post("/validate-token", validateToken.validateToken);

/**
 * @swagger
 * /api/login:
 *      post:
 *          summary: Login para obtener el token de acceso
 *          responses:
 *              200:
 *                  description: token
 *          parameters: [
 *              {
 *                  "in": "formData",
 *                  "name": "email",
 *                  "description": "Email del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "password",
 *                  "description": "password del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },
 *          ]
 *
 *
 */
api.post("/login", UserController.login);

/**
 * @swagger
 * /api/register:
 *      post:
 *          summary: Endpoint para el registro de usuarios
 *          responses:
 *              200:
 *                  description: Registered user
 *          parameters: [
 *              {
 *                  "in": "formData",
 *                  "name": "name",
 *                  "description": "nombre del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "surname",
 *                  "description": "",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "email",
 *                  "description": "Email del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "tel",
 *                  "description": "Teléfono del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "password",
 *                  "description": "Password del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "gender",
 *                  "description": "Género del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "birthdate",
 *                  "description": "Fecha de nacimiento del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },             
 *          ]
 *
 *
 */
api.post("/register", cors(corsOptions), UserController.registerUser);

api.get("/user/:id", md_auth.ensureAuth, UserController.getUserData);

api.put("/user/:id", md_auth.ensureAuth, UserController.updateUser);

api.patch("/user/:id", md_auth.ensureAuth, UserController.deleteUser);

// Hire Services
/**
 * @swagger
 * /api/hire:
 *      post:
 *          summary: Endpoint para contratar un servicio
 *          responses:
 *              200:
 *                  description: Registered user
 *          parameters: [
 *                {
 *                  "in": "header",
 *                  "name": "authorization",
 *                  "description": "Token de sesion del usuario",
 *                  "type": "String",
 *                  "required": true
 *                },
 *                {
 *                  "in": "formData",
 *                  "name": "business_id",
 *                  "description": "ID del negocio a contratar",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "service_id",
 *                  "description": "ID del servicio solicitado",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "client_id",
 *                  "description": "ID del cliente que contrata",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "date",
 *                  "description": "Fecha para la cual se requiere el servicio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "hour",
 *                  "description": "Fecha para la cual se requiere el servicio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *          ]
 */
api.post("/hire", md_auth.ensureAuth, ServicesController.hireService);

/**
 * @swagger
 * /api/hired:
 *      get:
 *          summary: Endpoint para dar al cliente los servicios que ha contratado
 *          responses:
 *              200:
 *                  description:
 *          parameters: [
 *                {
 *                  "in": "header",
 *                  "name": "authorization",
 *                  "description": "Token de sesion del usuario",
 *                  "type": "String",
 *                  "required": true
 *                },
 *                {
 *                  "in": "formData",
 *                  "name": "client_id",
 *                  "description": "ID del usuario",
 *                  "type": "String",
 *                  "required": true
 *              },
 *          ]
 */
api.get(
  "/hired",
  md_auth.ensureAuth,
  ServicesController.ClientGetHiredServices
);

// Business report

api.post(
  "/report-business/:id",
  md_auth.ensureAuth,
  UserController.businessReport
);

// Find business
api.get("/search/:param", md_auth.ensureAuth, UserController.findBusiness);

// Exportamos la configuración
module.exports = api;
