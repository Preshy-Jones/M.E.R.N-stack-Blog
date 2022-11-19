const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const config = require("../config");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../.env") });

module.exports = {
  generateJWTToken,
};

async function generateJWTToken(payload, secret, expireDuration) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        ...payload,
      },
      secret,
      { expiresIn: expireDuration },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}
