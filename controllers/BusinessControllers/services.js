"use strict";

const SERVICES = require("../../models/services");
const GETDATE = require("../../middlewares/getDate");
const cloudinary = require("cloudinary").v2;

// Create a new service
exports.createService = async function (req, res) {
  try {
    const { business_id, name, description, price, added } = req.body;
    const FINDSERVICE = await SERVICES.findOne({
      name: name,
      business_id: business_id,
    });

    if (FINDSERVICE) {
      res.json({
        Message: "This service already exists for the business",
      });
    } else {
      const { tempFilePath } = req.files.image;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
        folder: "services",
      });

      const SERVICE = new SERVICES({
        business_id: business_id,
        name: name,
        description: description,
        price: price,
        added: [],
        image: secure_url,
      });

      await SERVICE.save();
      res.status(200).send({ dato: "Service registered succesfully " });
    }
  } catch (error) {
    res.status(500).send({ dato: error.message || "An error occurred" });
  }
};

// Get all services

exports.getServices = async function (req, res) {
  const { business_id } = req.body;
  await SERVICES.find({ business_id: business_id }, function (err, data) {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json({ data });
    }
  });
};

// Get One Service

exports.getOneService = async function (req, res) {
  const { id } = req.params;
  await SERVICES.find({ _id: id }, function (err, data) {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json({ data });
    }
  });
};

// Update Service

exports.updateService = async function (req, res) {
  const { id } = req.params;
  const { business_id, name, description, price, added } = req.body;

  try {
    const modelData = await SERVICES.find({ _id: id });
    if (modelData[0].image) {
      const arrayName = modelData[0].image.split("/");
      const imageName = arrayName[arrayName.length - 1];
      const [public_id] = imageName.split(".");
      cloudinary.uploader.destroy("services/" + public_id);
    }

    const { tempFilePath } = req.files.image;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: "services",
    });

    await SERVICES.updateOne(
      {
        _id: id,
        business_id: business_id,
      },
      {
        $set: {
          name: name,
          description: description,
          price: price,
          added: added,
          image: secure_url,
        },
      }
    );
    res.json({
      Message: "Updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      Message: "An error occurred",
      Error: error.message || "Unknow error",
    });
  }
};

// Delete Service

exports.deleteService = async function (req, res) {
  const { id } = req.params;
  const { business_id } = req.body;
  try {
    const modelData = await SERVICES.find({ _id: id });
    if (modelData[0].image) {
      const arrayName = modelData[0].image.split("/");
      const imageName = arrayName[arrayName.length - 1];
      const [public_id] = imageName.split(".");
      cloudinary.uploader.destroy("services/" + public_id);
    }

    await SERVICES.deleteOne({
      _id: id,
      business_id: business_id,
    });
    res.json({
      Message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      Message: "An error occurred",
      Error: error.message || "Unknow error",
    });
  }
};
