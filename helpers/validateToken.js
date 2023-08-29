"user strict";
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "?xugw#BaH8=V_YJ";

exports.validateToken = function (req, res) {
  var reqToken = req.body.token
  var  token  = reqToken.replace(/['"]+/g, "");
  var payload = jwt.decode(token, secret);

  try {
    var payload = jwt.decode(token, secret);
    if (payload.exp < moment().unix()) {
      return res.status(401).send({
        message: "EL token ha expirado",
      });
    } else {
      return res.status(200).send({
        message: "Token válido",
        token,
        user: payload
      })
    }
  } catch (ex) {
    return res.status(404).send({
      message: "EL token no es valido",
    });
  }
};
