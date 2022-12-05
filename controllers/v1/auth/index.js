const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../../models/User");
const { generateJWTToken } = require("../../../utils");
const {
  ServiceError,
  ValidationError,
  ConflictError,
  AuthenticationError,
} = require("../../../errors");
const config = require("../../../config");

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
      throw new ConflictError("Email is already registered");
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
          console.log(hash);
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
              throw new ServiceError(err);
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

    const token = await generateJWTToken(
      payload,
      process.env.JWT_SECRET,
      "1800s"
    );
    const refreshToken = await generateJWTToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      "2d"
    );
    user.refreshToken = refreshToken;
    const result = await user.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: false,
      // secure: true,
      // sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        name: user.name,
        id: user._id,
        email: user.email,
      },
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = (req, res, next) => {};

module.exports.handleRefreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    console.log("hello");
    console.log(cookies);
    if (!cookies?.jwt) throw new AuthenticationError("No refresh token found");

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    // console.log(foundUser);
    if (!foundUser) return res.sendStatus(403); //Forbidden
    // evaluate jwt
    //    console.log(process.env.REFRESH_TOKEN_SECRET);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        console.log(decoded);
        console.log(foundUser);
        if (err || foundUser.email !== decoded.email)
          return res.sendStatus(403);
        const payload = {
          id: foundUser._id,
          email: foundUser.email,
        };
        const accessToken = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
          expiresIn: "20s",
        });
        res.json({ accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
};
