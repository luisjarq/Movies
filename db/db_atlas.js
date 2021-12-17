const mongoose = require("mongoose");
const { DB_URL } = require("../config/config");

/* const dbConnection = mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); */

const connect = async () => {
  try {
    const db = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(`Connected with db: ${name}, in host: ${host}`);
  } catch (error) {
    console.log("Error to connect with BD", error);
  }
};

module.exports = { connect, DB_URL };
