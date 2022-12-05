const express = require("express");
const User = require("./../../../models/User");

module.exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};

module.exports.getUser = async (req, res) => {
  // const foundUser = await User.findOne({ refreshToken }).exec();
  const user = await User.findById(req.params.id);
  res.json({ user });
};

module.exports.getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).exec();
  res.json({ user });
};
