"use strict";

const CATEGORIES = require("../../models/categories");
const GETDATE = require("../../middlewares/getDate");

// Create a new category
exports.createCategory = async function (req, res) {
  const FINDCATEGORY = await CATEGORIES.findOne({ name: req.body.name });
  const { name, description } = req.body;

  if (FINDCATEGORY) {
    res.json({ Message: "This category already exists" });
  } else {
    const CATEGORY = new CATEGORIES({
      name: name,
      description: description,
      created_at: GETDATE.getDate(),
      deleted_at: "",
      update_at: "",
    });

    await CATEGORY.save((err) => {
      if (err) {
        res.status(500).send({ dato: err });
      } else {
        res.status(200).send({ dato: "Category successfully registered" });
      }
    });
  }
};

// Get all categories

exports.getCategories = async function (req, res) {
  await CATEGORIES.find({}, function (err, data) {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json({ data });
    }
  });
};

//Get one category
exports.getCategory = async function (req, res) {
  const { id } = req.params;
  await CATEGORIES.find({ _id: id }, function (err, data) {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json({ data });
    }
  });
};

// Delete category

exports.deleteCategory = async function (req, res) {
  const { id } = req.params;
  try {
    await CATEGORIES.deleteOne({
      _id: id,
    });
    res.json({
      Message: "Successfully removed",
    });
  } catch (err) {
    res.json({
      Message: err,
    });
  }
};
