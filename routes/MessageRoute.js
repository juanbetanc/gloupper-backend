"use strict";

const express = require("express");

const MessageController= require("../controllers/ChatAppControllers/MessageController");

const api = express.Router();

var md_auth = require("../middlewares/authenticated");

api.post("/message/", md_auth.ensureAuth, MessageController.addMessage);
api.get("/message/:chatId", md_auth.ensureAuth, MessageController.getMessages);


module.exports = api;