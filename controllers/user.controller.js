// Cargamos el modelo
const User = require("../models/user");
// Cargamos el módulo de bcrypt
const bcrypt = require("bcrypt");
// Cargamos el módulo de jsonwebtoken
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../utils/httpStatusCode");
const { use } = require("../routers/users.router");

async function createUser(req, res, next) {
  try {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    //newUser.password = req.body.password;
    //mejora: comprobar si el user existe antes de guardar
    if (!(await User.findOne({ email: req.body.email }))) {
      await newUser.save();
      return res.status(201).json("User registered");
    }
    return res.status(400).json("User email already registered");
    //mejora: logear directamente al usuario
  } catch (err) {
    return next(err);
  }
}

async function autnethicateUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (bcrypt.compareSync(req.body.password, user.password)) {
      user.password = null;
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
        },
        req.app.get("secretKey"),
        {
          expiresIn: "1h",
        }
      );
      return res
        .status(200)
        .json({ token: token, expiresIn: 3600, id: user._id });
    } else {
      return res.status(400).json();
    }
  } catch (error) {
    next(error);
  }
}
async function logoutUser(req, res, next) {
  try {
    return res.status(200).json({ token: null });
  } catch (error) {
    next(error);
  }
}
module.exports = { createUser, autnethicateUser, logoutUser };
