'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    primaryColor: String,
    SecondaryColor: String,
    image: String,
    created_at: Date,    
});

module.exports = mongoose.model('Categories', categoriesSchema);