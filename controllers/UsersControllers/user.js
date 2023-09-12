"use strict";
// Cargamos los modelos para usarlos posteriormente
const User = require("../../models/user");
const MicroBusiness = require("../../models/microBusiness");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const cloudinary = require("cloudinary").v2;
const GETDATE = require("../../middlewares/getDate");

cloudinary.config({
  cloud_name: "dogm2pwd8",
  api_key: "594441475139653",
  api_secret: "mGIfz5HfT_iwJNiWWydb1RWKQNA",
});

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
    const response = { token: token, user: { name: USER.name, rol: USER.rol, userId: USER._id } };
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
  try {
    const findEmail = await User.findOne({ email: req.body.email });

    if (findEmail) {
      res.json({ Message: "The email already exists" });
    } else {
      let image = ""; // Inicializamos la variable de imagen en blanco

      if (req.files && req.files.image) {
        // Verificamos si se proporcionó una imagen en la solicitud
        const { tempFilePath } = req.files.image;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
          folder: "profiles",
        });

        image = secure_url; // Asignamos la URL de la imagen a la variable
      }

      const { name, email, rol, tel, password, gender, birthdate } = req.body;
      const hashedPassword = generateHashPassword(password);

      const USER = new User({
        name: name,
        email: email,
        rol: rol,
        tel: tel,
        password: hashedPassword,
        gender: gender,
        birthdate: birthdate,
        image: image, // Asignamos la URL de la imagen o un valor en blanco
        reports: 0,
        created_at: GETDATE.getDate(),
        updated_at: "",
        deleted_at: "",
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
      console.log("Error: " + err);
    } else {
      res.json( data );
    }
  });
};

// Update user data

exports.updateUser = async function (req, res) {
  const { id } = req.params;
  const { name, surname, email, tel, gender, birthdate } = req.body;

  try {
    const modelData = await User.find({ _id: id });
    if (modelData[0].image) {
      const arrayName = modelData[0].image.split("/");
      const imageName = arrayName[arrayName.length - 1];
      const [public_id] = imageName.split(".");
      cloudinary.uploader.destroy("profiles/" + public_id);
    }

    const { tempFilePath } = req.files.image;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: "profiles",
    });

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
          image: secure_url,
          updated_at: GETDATE.getDate(),
        },
      }
    );

    res.json({
      Message: "Edited successfully",
    });
  } catch (error) {
    res.status(500).json({
      Message: "An error occurred",
      Error: error.message || "Unknow error",
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
