"use strict";
// Cargamos los modelos para usarlos posteriormente
var MicroBusiness = require("../../models/microBusiness");
const GETDATE = require("../../middlewares/getDate");

// Register microBusiness

exports.registerMicroBusiness = async function (req, res) {
  const { id, name, description, nit, location, category } = req.body;
  const FINDNIT = await MicroBusiness.findOne({ nit: nit });
  const FINDUSER = await MicroBusiness.findOne({ user_id: id });
  if (FINDUSER) {
    res.json({ Message: "The user already has a registered business" });
  } else {
    if (FINDNIT) {
      res.json({ Message: "The NIT is already registered" });
    } else {
      const MICROBUSINESS = new MicroBusiness({
        user_id: id,
        name: name,
        description: description,
        nit: nit,
        location: location,
        status: "Active",
        assessment: "",
        comments: "",
        category: category,
        created_at: GETDATE.getDate(),
        deleted_at: "",
        update_at: "",
      });

      await MICROBUSINESS.save((err) => {
        if (err) {
          res.status(500).send({ dato: err });
        } else {
          res.status(200).send({ dato: "Business registered successfully" });
        }
      });
    }
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
          category: category,
          update_at: GETDATE.getDate(),
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
  } catch (err) {
    res.json({
      Message: err,
    });
  }
};

// User Report

exports.userReport = function(req, res) {
  
};