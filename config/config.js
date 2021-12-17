const dotnev = require("dotenv");
dotnev.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const JWT_Secret = process.env.JWT_Secret;

module.exports = { DB_URL, PORT, JWT_Secret };
