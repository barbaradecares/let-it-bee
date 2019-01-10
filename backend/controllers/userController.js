const User = require("../models/User.js");

let catchAsync = promise => {
  return new Promise(resolve => {
    promise.then(result => resolve([null, result]));
    promise.catch(error => resolve([error, null]));
  });
};

exports.index = async (req, res, next) => {
  let [err, users] = await catchAsync(User.find());
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.status(200).json(users);
  }
};

exports.show = async (req, res, next) => {
  let user = await User.findById(req.params.id);
  res.json(user);
};

exports.update = async (req, res, next) => {
  let [err, user] = await catchAsync(
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.json(user);
  }
};

exports.delete = async (req, res, next) => {
  let [err, user] = await catchAsync(User.findByIdAndDelete(req.params.id));
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.json(user);
  }
};

exports.create = async (req, res, next) => {
  console.log("controller");
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  await user.save();
  res.json(user);
};
