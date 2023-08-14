'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = Schema({
    name: String,
    description: String,
    primaryColor: String,
    SecondaryColor: String,
    image: String,
    created_at: String,    
});

module.exports = mongoose.model('Categories', categoriesSchema);