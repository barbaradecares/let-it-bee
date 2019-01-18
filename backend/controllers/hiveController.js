var request = require("request");
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
  console.log("hiii");
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

exports.getWeather = async (req, res, next) => {
  // console.log("controller");
  let hive = await Hive.find({ _id: req.params.id });
  hive = hive[0];
  // console.log(hive);
  let apiKey = "88440f3a1e59807fd6f14245a2e3346c",
    url = "https://api.darksky.net/forecast/",
    lati = hive.lat,
    longi = hive.lng,
    api_call = url + apiKey + "/" + lati + "," + longi;
  // console.log(api_call, hive);
  var clientServerOptions = {
    uri: api_call,
    body: JSON.stringify({}),
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  request(clientServerOptions, function(err, response) {
    if (response) {
      // console.log(response.body);
      let data = JSON.parse(response.body);
      weather = {
        temp: data.currently.temperature,
        summary: data.currently.summary
      };
      res.json({ weather, hive });
    } else {
      weather = {
        temp: 68,
        summary: "Partly Cloudy"
      };
    }
    if (err) {
      reject(err);
    }
  });
};
