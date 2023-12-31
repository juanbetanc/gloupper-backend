"use strict";
// Cargamos los modelos para usarlos posteriormente

require('dotenv').config();
const User = require("../../models/user");
const MicroBusiness = require("../../models/microBusiness");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const cloudinary = require("cloudinary").v2;
const GETDATE = require("../../helpers/getDate");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Conseguir datos de un usuario
exports.login = async function (req, res) {
  var { email, password } = req.body;
  const USER = await User.findOne({ email: email });
  
  if (verifyPassword(password, USER.password)) {
    //Generate JWT
    const payload = USER ;
    const token = jwt.encode(payload, "pruebprueba");
    // secret key : ? xbox usa golf walmart # BESTBUY apple HULU 8 = VISA _ YELP JACK
    const response = {
      token: token,
      user: USER,
    };
    return res.status(200).send(response);
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
  try {
    const findEmail = await User.findOne({ email: req.body.email });

    if (findEmail) {
      res.json({ Message: "The email already exists" });
    } else {

      let image = ""; // Inicializamos la variable de imagen en blanco

      // if (req.files && req.files.image) {
      //   // Verificamos si se proporcionó una imagen en la solicitud
      //   const { tempFilePath } = req.files.image;
      //   const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      //     folder: "profiles",
      //   });

      //   image = secure_url; // Asignamos la URL de la imagen a la variable
      // }

      const { firstname, email, rol = '', tel = '', password, gender = 'Pending', birthdate = '' } = req.body;
      const hashedPassword = generateHashPassword(password);

      const USER = new User({
        firstname: firstname,
        email: email,
        rol: rol,
        tel: tel,
        password: hashedPassword,
        gender: gender,
        birthdate: birthdate,
        image: image,
        reports: 0,
        created_at: GETDATE.getDate(),
        updated_at: null,
        deleted_at: null,
      });

      await USER.save();
      res.status(200).send({ dato: "Registered user" });
    }
  } catch (error) {
    res.status(500).send({ dato: error.message || "An error occurred" });
  }
};

// Get user data

exports.getUserData = async function (req, res) {
  const { id } = req.params;

  await User.findById({ _id: id }, function (err, data) {
    if (err) {
      res.json({"Error: " : err});
    } else {
      res.json(data);
    }
  });
};

// Update user data

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, tel, gender, birthdate, rol, image } = req.body;

    const updateFields = {};
    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;
    if (email) updateFields.email = email;
    if (tel) updateFields.tel = tel;
    if (gender) updateFields.gender = gender;
    if (birthdate) updateFields.birthdate = birthdate;
    if (rol) updateFields.rol = rol;
    if (image) updateFields.image = image;

    // if (req.files && req.files.image) {
    //   const { tempFilePath } = req.files.image;
    //   const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
    //     folder: "profiles",
    //   });
    //   updateFields.image = secure_url;
    // }

    updateFields.updated_at = new Date();

    await User.findByIdAndUpdate(id, updateFields, { new: true });

    res.json({
      Message: "Edited successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Message: "An error occurred",
      Error: error.message || "Unknown error",
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
          status: "Inactive",
          deleted_at: GETDATE.getDate(),
        },
      }
    );
    res.json({
      Message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      Message: "An error occurred",
      Error: error.message || "Unknow error",
    });
  }
};

// Reportar empresa
exports.businessReport = async function (req, res) {
  try {
    const { business_id } = req.params;
    const businessData = await User.find({ _id: business_id });
    const businessReports = businessData[0].reports;

    await User.updateOne(
      {
        _id: user_id,
      },
      {
        $set: {
          reports: businessReports + 1,
        },
      }
    );
    res.json({
      Message: "Business reported",
    });
  } catch (error) {
    res.status(500).json({
      Message: "An error occurred",
      Error: error.message || "Unknow error",
    });
  }
};

// Buscar Empresas

exports.findBusiness = async function (req, res) {
  try {
    const { param } = req.params;

    const data = await MicroBusiness.find({
      name: { $regex: param, $options: "i" },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      Message: "An error occurred",
      Error: error.message || "Unknow error",
    });
  }
};
