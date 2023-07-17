"use strict";
// Cargamos los modelos para usarlos posteriormente
var User = require("../../models/user");
var jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

// Conseguir datos de un usuario
exports.login = async function (req, res) {
  var { email, password } = req.body;
  const USER = await User.findOne({ email: email });

  if (verifyPassword(password, USER.password)) {
    // if (err) {
    //   console.log(err);
    //   return res.status(500).send({ err: err });
    // } else {
    //Generate JWT
    const payload = { user_id: USER._id, email: USER.email };
    const token = jwt.encode(payload, "?xugw#BaH8=V_YJ");
    // secret key : ? xbox usa golf walmart # BESTBUY apple HULU 8 = VISA _ YELP JACK
    const response = { token: token, user: { name: USER.name, rol: USER.rol } };
    return res.status(200).send(response);
    // }
  }

  return res.json({ Message: "Incorrect credentials" });
};

// Función para encriptar la password del usuario
const generateHashPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const verifyPassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

// Función asíncrona que espera por respuestas
exports.registerUser = async function (req, res) {
  // Devuelve el objeto del usuario en caso de que se encuentre una coincidencia
  // entre el email otorgaro por el usuario y un email registrado en la bd

  const findEmail = await User.findOne({ email: req.body.email });

  const { name, surname, email, rol, tel, password, gender, birthdate, image } =
    req.body;

  if (findEmail) {
    res.json({ Message: "The mail already exists" });
  } else {
    const USER = new User({
      name: name,
      surname: surname,
      email: email,
      rol,
      tel: tel,
      password: generateHashPassword(password),
      gender: gender,
      birthdate: birthdate,
      image: image,
    });

    await USER.save((err) => {
      if (err) {
        res.status(500).send({ dato: err });
      } else {
        res.status(200).send({ dato: "Registered user" });
      }
    });
  }
};

// Get user data

exports.getUserData = async function (req, res) {
  const { id } = req.params;
  await User.find({ _id: id }, function (err, data) {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json({ data });
    }
  });
};


// Update user data

exports.updateUser = async function (req, res) {
  const { id } = req.params;
  const { name, surname, email, tel, gender, birthdate, image } = req.body;

  try {
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name: name,
          surname: surname,
          email: email,
          tel: tel,
          gender: gender,
          birthdate: birthdate,
          image: image,
        },
      }
    );
    res.json({
      Message: "Edited successfully",
    });
  } catch (err) {
    res.json({
      Message: err,
    });
  }
};


// Delete User

exports.deleteUser = async function (req, res) {
  const { id } = req.params;

  try {
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          status: 'Inactive'
        },
      }
    );
    res.json({
      Message: "User Deleted",
    });
  } catch (err) {
    res.json({
      Message: err,
    });
  }
}