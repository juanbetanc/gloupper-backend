"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hiredServiceSchema = Schema({
    business_id: String,
    service_id: String,
    client_id: String,
    status: String,
    location: String,
    date: String,
    hour: String,
    message: String,
    hired_at: String    
})

module.exports = mongoose.model("HiredService", hiredServiceSchema);