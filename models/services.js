'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServicesSchema = Schema({
    _business: {type: String, ref: 'MicroBusiness'},
    name: { type: String, require: true },
    description: { type: String, require: true },
    added: Array,
    price: { type: Number, require: true },
    image: { type: String, require: true },
    created_at: Date,
    update_at: Date,
});

module.exports = mongoose.model('Services', ServicesSchema);