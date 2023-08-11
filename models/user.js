'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
    name: String,   
    email: String,
    rol: String,
    tel: String,
    status: String,
    password: String,
    gender: String, 
    birthdate: String, 
    image: String,
    created_at: String,
    deleted_at: String,
    updated_at: String, 
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('User', UserSchema);