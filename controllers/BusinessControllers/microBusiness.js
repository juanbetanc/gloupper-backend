"use strict";
// Cargamos los modelos para usarlos posteriormente
var MicroBusiness = require("../../models/microBusiness");
const User = require("../../models/user");
const GETDATE = require("../../middlewares/getDate");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dogm2pwd8",
  api_key: "594441475139653",
  api_secret: "mGIfz5HfT_iwJNiWWydb1RWKQNA",
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

        const MICROBUSINESS = new MicroBusiness({
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
          deleted_at: "",
          update_at: "",
        });

        await MICROBUSINESS.save();
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
      console.log("Error: " + err);
    } else {
      res.json({ data });
    }
  });
};

// Get one Microbusiness

exports.getOneMicrobusiness = async function (req, res) {
  const { id } = req.params;
  await MicroBusiness.find({ _id: id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data });
    }
  });
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
    const userData = await User.find({ _id: user_id })    
    const userReports = userData[0].reports 

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
