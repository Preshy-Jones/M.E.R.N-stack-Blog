const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../../models/User");
const { generateJWTToken } = require("../../../utils");
const { ServiceError, ValidationError } = require("../../../errors");

module.exports.register = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  try {
    if (!name || !email || !password || !password2) {
      //throw new ServiceError("please fill in all fields");
      errors.push({ message: "please fill in all fields" });
    }
    if (password !== password2) {
      //throw new ServiceError("passwords do not match");
      errors.push({ message: "passwords do not match" });
    }

    if (password.length < 6) {
      //throw new ServiceError("password should be at least 6 characters");
      errors.push({ message: "password should be at least 6 characters" });
    }
    console.log("hello");
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    const user = await User.findOne({ email: email });
    if (user) {
      // errors.push({ message: "Email is already registered" });
      throw new ValidationError([{ message: "Email is already registered" }]);
    } else {
      const newUser = User({
        name,
        email,
        password,
      });
      console.log(newUser);
      // res.send('hello')
      //Hash Passoword
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //set password to hashed password
          newUser.password = hash;
          // res.send(newUser);
          //save user
          newUser
            .save()
            .then((user) => {
              res.json({ status: "success", data: newUser });
            })

            .catch((err) => {
              throw ServiceError(err);
              console.log(err);
            });
        })
      );
    }
  } catch (error) {
    next(error);
  }
  //

  //        res.send('pass')
};
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      // return res
      //   .status(401)
      //   .send({ success: false, message: "that email is not registered" });
      throw new ValidationError([{ message: "This email is not registered" }]);
    }
    let passwordCorrect = false;
    //match password

    if (!bcrypt.compareSync(password, user.password)) {
      // return res
      //   .status(401)
      //   .send({ success: false, message: "password incorrect " });
      throw new ValidationError([{ message: "Password incorrect" }]);
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await generateJWTToken(payload);
    return res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = (req, res, next) => {};
