"use strict";
var express = require("express");
var CategoriesController = require("../controllers/BusinessControllers/categories");
var api = express.Router();
var md_auth = require("../middlewares/authenticated");

/**
 * @swagger
 * /api/categories:
 *      post:
 *          summary: Endpoint para crear categorías
 *          responses:
 *              200:
 *                  description: Category successfully registered
 *          parameters: [
*               {
*                  "in": "header",
*                  "name": "authorization",
*                  "description": "Token de sesion del usuario",
*                  "type": "String",
*                  "required": true
*               },
 *              {
 *                  "in": "formData",
 *                  "name": "name",
 *                  "description": "Nombre de la categoría",
 *                  "type": "String",
 *                  "required": true
 *              },
 *              {
 *                  "in": "formData",
 *                  "name": "description",
 *                  "description": "Descripción de la categoría",
 *                  "type": "String",
 *                  "required": true
 *              },
 *          ]
 */
api.post("/categories", md_auth.ensureAuth, CategoriesController.createCategory);

/**
 * @swagger
 * /api/categories:
 *      get:
 *          summary: Endpoint para obtener las categorías
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
api.get("/categories", md_auth.ensureAuth, CategoriesController.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *      get:
 *          summary: Endpoint para obtener una categoría
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
*                  "description": "Id de la categoría a obtener",
*                  "type": "String",
*                  "required": true
*               },
*          ]
*/
api.get("/categories/:id", md_auth.ensureAuth, CategoriesController.getCategory);

/**
 * @swagger
 * /api/categories:
 *      patch:
 *          summary: Endpoint para eliminar una categoría
 *          responses:
 *              200:
 *                  description: Category successfully deleted
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
*                  "description": "Id de la categoría a obtener",
*                  "type": "String",
*                  "required": true
*               },
*          ]
*/
api.patch("/categories", md_auth.ensureAuth, CategoriesController.deleteCategory);

module.exports = api;
