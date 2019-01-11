const History = require("../models/History.js");

let catchAsync = promise => {
  return new Promise(resolve => {
    promise.then(result => resolve([null, result]));
    promise.catch(error => resolve([error, null]));
  });
};

exports.index = async (req, res, next) => {
  let [err, histories] = await catchAsync(History.find());
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.status(200).json(histories);
  }
};

exports.show = async (req, res, next) => {
  let history = await History.findById(req.params.id);
  res.json(history);
};

exports.update = async (req, res, next) => {
  let [err, history] = await catchAsync(
    History.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.json(history);
  }
};

exports.delete = async (req, res, next) => {
  let [err, history] = await catchAsync(
    History.findByIdAndDelete(req.params.id)
  );
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.json(history);
  }
};

exports.create = async (req, res, next) => {
  let history = new History({
    hiveId: req.body.hiveId,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    weight: req.body.weight,
    notes: req.body.notes
  });
  await history.save();
  res.json(history);
};

exports.filteredHistories = async (req, res, next) => {
  let histories = await History.find({ hiveId: req.params.id });
  res.json(histories);
};

exports.lastHistory = async (req, res, next) => {
  ///find a way of selecting last history added
};
