"use strict";
// Cargamos los modelos para usarlos posteriormente
require("dotenv").config();
var MicroBusiness = require("../../models/microBusiness");
// const SERVICES = require("../../models/services");
const User = require("../../models/user");
const GETDATE = require("../../helpers/getDate");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Register microBusiness

exports.registerMicroBusiness = async function (req, res) {
  try {
    const { id, name, description, nit, location, category } = req.body;

    const FINDNIT = await MicroBusiness.findOne({ nit: nit });
    const FINDUSER = await MicroBusiness.findOne({ user_id: id });
    if (FINDUSER) {
      res.json({ Message: "The user already has a registered business" });
    } else {
      if (FINDNIT) {
        res.json({ Message: "The NIT is already registered" });
      } else {
        const { tempFilePath } = req.files.image;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
          folder: "stores",
        });

        const microBusiness = new MicroBusiness({
          user_id: id,
          name: name,
          description: description,
          nit: nit,
          location: location,
          image: secure_url,
          status: "Active",
          assessment: "",
          comments: "",
          category: category,
          created_at: GETDATE.getDate(),
          deleted_at: null,
          update_at: null,
        });

        await microBusiness.save();
        res.status(200).send({ dato: "Business registered successfully" });
      }
    }
  } catch (error) {
    res.status(500).send({ dato: error.message || "An error occurred" });
  }
};

// Get all Micro business
exports.getMicroBusiness = async function (req, res) {
  await MicroBusiness.find({ status: "Active" }, function (err, data) {
    if (err) {
      res.json({ "Error: ": err });
    } else {
      res.json({ data });
    }
  });
};

// Get one Microbusiness

exports.getOneMicrobusiness = async function (req, res) {
  const { id } = req.params;

  try {
    const microBusiness = await MicroBusiness.findOne({ _id: id }).populate(
      "services"
    );

    if (!microBusiness) {
      return res.status(404).json({ error: "MicroBusiness no encontrado" });
    }

    res.json(microBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar MicroBusiness" });
  }
};
// Update Microbusiness

exports.updateMicrobusiness = async function (req, res) {
  const { id } = req.params;
  const { name, description, nit, location, category } = req.body;

  try {
    const modelData = await MicroBusiness.find({ _id: id });
    if (modelData[0].image) {
      const arrayName = modelData[0].image.split("/");
      const imageName = arrayName[arrayName.length - 1];
      const [public_id] = imageName.split(".");
      cloudinary.uploader.destroy("stores/" + public_id);
    }

    const { tempFilePath } = req.files.image;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: "stores",
    });
    await MicroBusiness.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name: name,
          description: description,
          nit: nit,
          location: location,
          image: secure_url,
          category: category,
          update_at: GETDATE.getDate(),
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

// Delete MicroBusiness

exports.deleteMicroBusiness = async function (req, res) {
  try {
    await MicroBusiness.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          status: "Inactive",
          deleted_at: GETDATE.getDate(),
        },
      }
    );
    res.json({
      Message: "Deleted business",
    });
  } catch (error) {
    res.status(500).json({
      Message: "An error occurred",
      Error: error.message || "Unknow error",
    });
  }
};

// User Report

exports.userReport = async function (req, res) {
  try {
    const { user_id } = req.params;
    const userData = await User.find({ _id: user_id });
    const userReports = userData[0].reports;

    await User.updateOne(
      {
        _id: user_id,
      },
      {
        $set: {
          reports: userReports + 1,
        },
      }
    );
    res.json({
      Message: "User reported",
    });
  } catch (error) {
    res.status(500).json({
      Message: "An error occurred",
      Error: error.message || "Unknow error",
    });
  }
};
