'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesSchema = Schema({
    _business: {type: String, ref: 'MicroBusiness'},
    name: String,
    description: String,
    added: Array,
    price: Number,
    image: String,
    created_at: String,
    update_at: String,
});

module.exports = mongoose.model('Services', ServicesSchema);