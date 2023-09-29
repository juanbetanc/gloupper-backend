"use strict";

const express = require("express");

const ChatController = require("../controllers/ChatAppControllers/ChatController");

const api = express.Router();

var md_auth = require("../middlewares/authenticated");

api.post("/chat", md_auth.ensureAuth, ChatController.createChat);
api.get("/chat/:userId", md_auth.ensureAuth, ChatController.userChats);
api.get("/chat/find/:firstId/:secondId", md_auth.ensureAuth, ChatController.findChat);

module.exports = api;