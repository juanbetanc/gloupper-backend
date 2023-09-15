"use strict";

const HIREDSERVICE = require("../../models/hiredService");
const MICROBUSINESS = require("../../models/microBusiness");
const GETDATE = require("../../helpers/getDate");

// Get Hired Services

exports.BusinessGetHiredServices = async function (req, res) {
  const { business_id } = req.body;
  await HIREDSERVICE.find({ business_id: business_id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data });
    }
  });
};

exports.UpdateStatusHiredServices = async function (req, res) {
  const { id } = req.params;
  const { business_id, status } = req.body;

  try {
    await HIREDSERVICE.updateOne(
      {
        _id: id,
        business_id: business_id,
      },
      {
        $set: {
          status: status,
        },
      }
    );

    res.json("Updated status")
    
  } catch (err) {
    res.json({
      Message: err,
    });
  }
};
