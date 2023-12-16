"use strict";

var express = require("express");

var ServicesController = require("../controllers/BusinessControllers/services");

var api = express.Router();

var md_auth = require("../middlewares/authenticated");

/**
 * @swagger
 * /api/services:
 *      get:
 *          summary: Endpoint para obtener los servicios
 *          responses:
 *              200:
 *                  description: 
 *          parameters: [
*               {
*                  "in": "header",
*                  "name": "authorization",
*                  "description": "Token de sesion del usuario",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "business_id",
*                  "description": "Id del negocio al cual se desa consultar los servicios",
*                  "type": "String",
*                  "required": true
*               },
 *          ]
 */
api.get("/services", md_auth.ensureAuth, ServicesController.getServices);

/**
 * @swagger
 * /api/services/{id}:
 *      get:
 *          summary: Endpoint para obtener un servicio
 *          responses:
 *              200:
 *                  description: 
 *          parameters: [
*               {
*                  "in": "header",
*                  "name": "authorization",
*                  "description": "Token de sesion del usuario",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "path",
*                  "name": "id",
*                  "description": "Id del servicio que se desea consultar",
*                  "type": "String",
*                  "required": true
*               },
 *          ]
 */
api.get("/services/:id", md_auth.ensureAuth, ServicesController.getOneService);

/**
 * @swagger
 * /api/services:
 *      post:
 *          summary: Endpoint para crear un servicio
 *          responses:
 *              200:
 *                  description: 
 *          parameters: [
*               {
*                  "in": "header",
*                  "name": "authorization",
*                  "description": "Token de sesion del usuario",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "business_id",
*                  "description": "Id del negocio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "name",
*                  "description": "Nombre del servicio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "description",
*                  "description": "Descripción del servicio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "price",
*                  "description": "Precio del servicio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "added",
*                  "description": "Añadidos del servicio",
*                  "type": "Array",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "image",
*                  "description": "Imagen del servicio",
*                  "type": "String",
*                  "required": true
*               },
 *          ]
 */
api.post("/services", md_auth.ensureAuth, ServicesController.createService);

/**
 * @swagger
 * /api/services/{id}:
 *      put:
 *          summary: Endpoint para actualizar un servicio
 *          responses:
 *              200:
 *                  description: 
 *          parameters: [
*               {
*                  "in": "header",
*                  "name": "authorization",
*                  "description": "Token de sesion del usuario",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "path",
*                  "name": "id",
*                  "description": "Id del negocio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "business_id",
*                  "description": "Id del negocio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "name",
*                  "description": "Nombre del servicio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "description",
*                  "description": "Descripción del servicio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "price",
*                  "description": "Precio del servicio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "added",
*                  "description": "Añadidos del servicio",
*                  "type": "Array",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "image",
*                  "description": "Imagen del servicio",
*                  "type": "String",
*                  "required": true
*               },
 *          ]
 */
api.put("/services/:id", md_auth.ensureAuth, ServicesController.updateService);

/**
 * @swagger
 * /api/services/{id}:
 *      patch:
 *          summary: Endpoint para eliminar un servicio
 *          responses:
 *              200:
 *                  description: Deleted succesfully
 *          parameters: [
*               {
*                  "in": "header",
*                  "name": "authorization",
*                  "description": "Token de sesion del usuario",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "path",
*                  "name": "id",
*                  "description": "Id del negocio",
*                  "type": "String",
*                  "required": true
*               },
*               {
*                  "in": "formData",
*                  "name": "business_id",
*                  "description": "Id del negocio",
*                  "type": "String",
*                  "required": true
*               },               
 *          ]
 */
api.delete("/services/:id", md_auth.ensureAuth, ServicesController.deleteService);

module.exports = api