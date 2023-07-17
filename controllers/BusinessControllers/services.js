"use strict";

const SERVICES = require("../../models/services");
const GETDATE = require("../../middlewares/getDate");

// Create a new service
exports.createService = async function (req, res) {
  const { business_id, name, description, price, added, image } = req.body;
  const FINDSERVICE = await SERVICES.findOne({
    name: name,
    business_id: business_id,
  });

  if (FINDSERVICE) {
    res.json({
      Message: "This service already exists for the business",
    });
  } else {
    const SERVICE = new SERVICES({
      business_id: business_id,
      name: name,
      description: description,
      price: price,
      added: [],
      image: "",
    });

    await SERVICE.save((err) => {
      if (err) {
        res.status(500).send({ dato: err });
      } else {
        res.status(200).send({ dato: "Saved successfully" });
      }
    });
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
  const { business_id, name, description, price, added, image } = req.body;

  try {
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
          image: image,
        },
      }
    );
    res.json({
      Message: "Updated successfully",
    });
  } catch (err) {
    res.json({
      Message: err,
    });
  }
};

// Delete Service

exports.deleteService = async function (req, res) {
  const { id } = req.params;
  const { business_id } = req.body
  try {
    await SERVICES.deleteOne({
      _id: id,
      business_id: business_id
    });
    res.json({
      Message: "Deleted successfully",
    });
  } catch (err) {
    res.json({
      Message: err,
    });
  }
};
