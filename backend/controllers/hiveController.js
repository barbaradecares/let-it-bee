const Hive = require("../models/Hive.js");

let catchAsync = promise => {
  return new Promise(resolve => {
    promise.then(result => resolve([null, result]));
    promise.catch(error => resolve([error, null]));
  });
};

exports.index = async (req, res, next) => {
  let [err, hives] = await catchAsync(Hive.find());
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.status(200).json(hives);
  }
};

exports.show = async (req, res, next) => {
  let hive = await Hive.findById(req.params.id);
  res.json(hive);
};

exports.update = async (req, res, next) => {
  let [err, hive] = await catchAsync(
    Hive.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.json(hive);
  }
};

exports.delete = async (req, res, next) => {
  let [err, hive] = await catchAsync(Hive.findByIdAndDelete(req.params.id));
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.json(hive);
  }
};

exports.create = async (req, res, next) => {
  let hive = new Hive({
    userId: req.body.userId,
    name: req.body.name,
    location: req.body.location,
    lat: req.body.lat,
    lng: req.body.lng,
    currentTemperature: req.body.temperature,
    currentHumidity: req.body.humidity,
    currentWeight: req.body.weight
  });
  await hive.save();
  res.json(hive);
};

exports.filteredHives = async (req, res, next) => {
  let hives = await Hive.find({ userId: req.params.id });
  res.json(hives);
};
