'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MicroBusinessSchema = Schema({
    user_id: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    nit: String,
    location: String,
    status: { type: String },
    services: [{type: Schema.Types.ObjectId, ref: 'Services'}],
    assessment: Number,
    comments: String,
    category: { type: String, require: true },
    image: { type: String },    
    logo:{ type: String }, 
    created_at: Date,
    deleted_at: Date,
    update_at: Date,    
});

module.exports = mongoose.model('MicroBusiness', MicroBusinessSchema);