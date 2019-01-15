const Record = require("../models/Record.js");

let catchAsync = promise => {
  return new Promise(resolve => {
    promise.then(result => resolve([null, result]));
    promise.catch(error => resolve([error, null]));
  });
};

exports.index = async (req, res, next) => {
  let [err, records] = await catchAsync(Record.find());
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.status(200).json(records);
  }
};

exports.show = async (req, res, next) => {
  let record = await Record.findById(req.params.id);
  res.json(record);
};

exports.update = async (req, res, next) => {
  let [err, record] = await catchAsync(
    Record.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.json(record);
  }
};

exports.delete = async (req, res, next) => {
  let [err, record] = await catchAsync(Record.findByIdAndDelete(req.params.id));
  if (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  } else {
    res.json(record);
  }
};

exports.create = async (req, res, next) => {
  let record = new Record({
    hiveId: req.body.hiveId,
    weather: req.body.weather,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    weight: req.body.weight,
    notes: req.body.notes,
    created_at: req.body.created_at
  });
  await record.save();
  res.json(record);
};

exports.filteredRecords = async (req, res, next) => {
  let records = await Record.find({ hiveId: req.params.id });
  res.json(records);
};

exports.lastRecord = async (req, res, next) => {
  ///find a way of selecting last record added
};
