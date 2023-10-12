"use strict";

require("dotenv").config();
const MicroBusiness = require("../../models/microBusiness");
const Services = require("../../models/services");
const GETDATE = require("../../helpers/getDate");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new service
exports.createService = async function (req, res) {
  try {
    const { business_id, name, description, price, image, added } = req.body;

    // Verificar si el servicio ya existe para la MicroBusiness
    const existingService = await Services.findOne({
      _business: business_id,
      name: name,
    });

    if (existingService) {
      return res
        .status(400)
        .json({ Message: "This service already exists for the business" });
    }

    // Subir la imagen a Cloudinary
    // const { tempFilePath } = req.files.image;
    // const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
    //   folder: "services",
    // });

    // Crear una nueva instancia de Service
    const newService = new Services({
      _business: business_id,
      name: name,
      description: description,
      price: price,
      added: added || [],
      image: image,
      created_at: new Date().toISOString(),
      update_at: null,
    });

    // Guardar el nuevo servicio en la base de datos
    await newService.save();

    // Actualizar la lista de servicios en la MicroBusiness
    await MicroBusiness.findByIdAndUpdate(
      business_id,
      { $push: { services: newService._id } },
      { new: true }
    );

    res.status(200).json({ dato: "Service registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ dato: error.message || "An error occurred" });
  }
};

// Get all services

exports.getServices = async function (req, res) {
  const { business_id } = req.body;
  await Services.find({ business_id: business_id }, function (err, data) {
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
  await Services.find({ _id: id }, function (err, data) {
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
    const modelData = await Services.find({ _id: id });
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
    const modelData = await Services.find({ _id: id });
    if (modelData[0].image) {
      const arrayName = modelData[0].image.split("/");
      const imageName = arrayName[arrayName.length - 1];
      const [public_id] = imageName.split(".");
      cloudinary.uploader.destroy("services/" + public_id);
    }

    await Services.deleteOne({
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
