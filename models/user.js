const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Etapas de computacion apra encriptado
const steps = 10;

const userSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);
//Añadir un pre-hook de mongo para que se ejecute antes de ser guardado
/* userSchema.pre("save", (next) => {
  this.model.password = bcrypt.hashSync(this.model.password, steps);
  next();
}); */
// Crear modelo usuario con el eesquema de usuario
const User = mongoose.model("User", userSchema);
module.exports = User;
