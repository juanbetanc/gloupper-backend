"use strict";

const HireService = require("../../models/hiredService");
const MICROBUSINESS = require("../../models/microBusiness");
const GETDATE = require("../../middlewares/getDate");

// Hire service

exports.hireService = async function (req, res) {
  const { business_id, service_id, client_id, location, date, hour, message } =
    req.body;
  const FINDUSERSERVICE = await HireService.findOne({
    business_id: business_id,
    service_id: service_id,
    client_id: client_id,
    date: date,
    hour: hour,
  });

  if (FINDUSERSERVICE) {
    res.json({
      Message:
        "The user has already contracted this service for the same date and time",
    });
  } else {
    const HIRESERVICE = new HireService({
      business_id: business_id,
      service_id: service_id,
      client_id: client_id,
      status: "Pendiente",
      location: location,
      date: date,
      hour: hour,
      message: message,
      hired_at: GETDATE.getDate(),
    });

    await HIRESERVICE.save((err) => {
      if (err) {
        res.status(500).send({ dato: err });
      } else {
        res.status(200).send({ dato: "Service hired!" });
      }
    });
  }
};

// Client - Get hired services 

exports.ClientGetHiredServices = async function(req, res){
  const { client_id } = req.body;
  await HireService.find({ client_id: client_id}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json({ data });
    }
  });
}