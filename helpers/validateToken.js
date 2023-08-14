"user strict";
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "?xugw#BaH8=V_YJ";

exports.validateToken = function (req, res, next) {
  var { token } = req.body.replace(/['"]+/g, "");
  try {
    var payload = jwt.decode(token, secret);
    if (payload.exp > moment().unix()) {
      return res.status(401).send({
        message: "EL token ha expirado",
      });
    } else {
      req.user = payload;
      next();
    }
  } catch (ex) {
    return res.status(404).send({
      message: "EL token no es valido",
    });
  }
};
