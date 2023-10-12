"use strict";

var express = require("express");

var MicroBusinessController = require("../controllers/BusinessControllers/microBusiness");
var ServicesController = require("../controllers/BusinessControllers/hiredServices")

var api = express.Router();

var md_auth = require("../middlewares/authenticated");

/**
 * @swagger
 * /api/business:
 *      get:
 *          summary: Endpoint para obtener todos los negocios
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
*          ]
*/
api.get("/business", md_auth.ensureAuth, MicroBusinessController.getMicroBusiness);

/**
 * @swagger
 * /api/business/:
 *      get:
 *          summary: Endpoint para obtener un negocio
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
*                {
*                  "in": "path",
*                  "name": "id",
*                  "description": "Id delnegocio a obtener",
*                  "type": "String",
*                  "required": true
*               },
*          ]
*/
api.get("/business/:id", md_auth.ensureAuth, MicroBusinessController.getOneMicrobusiness);

api.get("/mybusiness/:user_id", md_auth.ensureAuth, MicroBusinessController.getMyBusiness);

/**
 * @swagger
 * /business:
 *      post:
 *          summary: Endpoint para registrar un negocio
 *          responses:
 *              200:
 *                  description: Business registered successfully
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
 *                  "name": "user_id",
 *                  "description": "ID del usuario que registra el negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "name",
 *                  "description": "Nombre del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "description",
 *                  "description": "Descripción del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "nit",
 *                  "description": "Nit del negocio",
 *                  "type": "String",
 *                  "required": false
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "location",
 *                  "description": "Localización del negocio",
 *                  "type": "location",
 *                  "required": false
 *              },                                                        
 *              {
 *                  "in": "formData",
 *                  "name": "category",
 *                  "description": "Categoría del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *          ]
 */
api.post("/business", md_auth.ensureAuth, MicroBusinessController.registerMicroBusiness);

/**
 * @swagger
 * /api/business/:
 *      put:
 *          summary: Endpoint para registrar un negocio
 *          responses:
 *              200:
 *                  description: Saved successfully
 *          parameters: [
 *                {
 *                  "in": "header",
 *                  "name": "authorization",
 *                  "description": "Token de sesion del usuario",
 *                  "type": "String",
 *                  "required": true
 *                },
 *              {
 *                  "in": "path",
 *                  "name": "id",
 *                  "description": "ID del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "name",
 *                  "description": "Nombre del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "description",
 *                  "description": "Descripción del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "nit",
 *                  "description": "Nit del negocio",
 *                  "type": "String",
 *                  "required": false
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "location",
 *                  "description": "Localización del negocio",
 *                  "type": "location",
 *                  "required": false
 *              },                                                        
 *              {
 *                  "in": "formData",
 *                  "name": "category",
 *                  "description": "Categoría del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "status",
 *                  "description": "Estado del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *          ]
 */
api.put("/business/:id", md_auth.ensureAuth, MicroBusinessController.updateMicrobusiness);

/**
 * @swagger
 * /api/business/{id}:
 *      patch:
 *          summary: Endpoint para eliminar un negocio
 *          responses:
 *              200:
 *                  description: Deleted successfully
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
 *                  "name": "user_id",
 *                  "description": "ID del usuario que registra el negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "path",
 *                  "name": "id",
 *                  "description": "Id del negocio",
 *                  "type": "String",
 *                  "required": true
 *              }
 *          ]
 */
api.patch("/business/:id", md_auth.ensureAuth, MicroBusinessController.deleteMicroBusiness);

// Hired Services

/**
 * @swagger
 * /api/businessHired:
 *      get:
 *          summary: Endpoint para dar al negocio los servicios que han realizado
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
 *                  "name": "business_id",
 *                  "description": "ID del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *          ]
 */
api.get("/businessHired", md_auth.ensureAuth, ServicesController.BusinessGetHiredServices);

/**
 * @swagger
 * /api/businessHired/{id}:
 *      patch:
 *          summary: Endpoint para actualizar el estado de una contratación
 *          responses:
 *              200:
 *                  description:  Updated status
 *          parameters: [
 *                {
 *                  "in": "header",
 *                  "name": "authorization",
 *                  "description": "Token de sesion del usuario",
 *                  "type": "String",
 *                  "required": true
 *                },
 *                {
 *                  "in": "path",
 *                  "name": "id",
 *                  "description": "ID del servicio contratado",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "business_id",
 *                  "description": "Id del negocio",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "status",
 *                  "description": "Nuevo estado de la contratación",
 *                  "type": "String",
 *                  "required": true
 *              }
 *          ]
 */
api.patch("/businessHired/:id", md_auth.ensureAuth, ServicesController.UpdateStatusHiredServices);

// User report
api.post("/report-user/:id", md_auth.ensureAuth, MicroBusinessController.userReport);

module.exports = api