"use strict";
// Cargamos el módulo de mongoose
var mongoose = require("mongoose");
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  rol: { type: String, require: true },
  tel: { type: String, require: true },
  status: { type: String, require: true },
  password: { type: String, require: true },
  gender: {
    type: String,
    enum: ["Pending", "Setbacks", "Done", "Refused", "Accepted"],
    require: true,
  },
  birthdate: Date,
  image: { type: String, require: true },
  reports: Number,
  created_at: String,
  deleted_at: String,
  updated_at: String,
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model("User", UserSchema);
