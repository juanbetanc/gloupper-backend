'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MicroBusinessSchema = Schema({
    user_id: String,
    name: String,
    description: String,
    nit: String,
    location: String,
    status: String,
    services: [{type: Schema.Types.ObjectId, ref: 'Services'}],
    assessment: Number,
    comments: String,
    category: String,
    image: String,    
    created_at: String,
    deleted_at: String,
    update_at: String,    
});

module.exports = mongoose.model('MicroBusiness', MicroBusinessSchema);