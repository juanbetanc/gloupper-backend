"use strict";

require ("dotenv").config();
const CATEGORIES = require("../../models/categories");
const GETDATE = require("../../helpers/getDate");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new category
exports.createCategory = async function (req, res) {
  try {
    const FINDCATEGORY = await CATEGORIES.findOne({ name: req.body.name });
    const { name, description, primaryColor, secondaryColor } = req.body;

    if (FINDCATEGORY) {
      res.json({ Message: "This category already exists" });
    } else {
      const { tempFilePath } = req.files.image;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
        folder: "categories",
      });
      const CATEGORY = new CATEGORIES({
        name: name,
        description: description,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        image: secure_url,
        created_at: GETDATE.getDate(),
        deleted_at: "",
        update_at: "",
      });

      await CATEGORY.save();
      res.status(200).send({ dato: "Category successfully registered" });
    }
  } catch (error) {
    res.status(500).send({ dato: error.message || "An error occurred" });
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
