"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hiredServiceSchema = Schema({
    business_id: { type: String, require: true },
    service_id: { type: String, require: true },
    client_id: { type: String, require: true },
    status: {
        type: String,
        enum: ['Pending', 'Setbacks', 'Done', 'Refused', 'Accepted']
    },
    location: String,
    date: Date,
    hour: String,
    message: String,
    hired_at: Date    
})

module.exports = mongoose.model("HiredService", hiredServiceSchema);