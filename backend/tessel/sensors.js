var request = require("request");
var http = require("http");
var os = require("os");
var path = require("path");

var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

var Express = require("express");
var SocketIO = require("socket.io");

var application = new Express();
var server = new http.Server(application);
var io = new SocketIO(server);
const util = require("util");

application.use(Express.static(path.join(__dirname, "/app")));
application.use("/vendor", Express.static(__dirname + "/node_modules/"));

let hiveId = "5c3d06ea06f4306720f48816";
let hive;
let weather = {};

const fetchHiveInfo = () => {
  var clientServerOptions = {
    uri: `http://10.185.5.111:5000/api/hive/${hiveId}`, //check ip address ipconfig getifaddr en0
    body: JSON.stringify({}),
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  return new Promise((resolve, reject) => {
    request(clientServerOptions, function(err, response) {
      // console.log(error, response);
      hive = JSON.parse(response.body);

      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const fetchWeather = () => {
  var apiKey = "88440f3a1e59807fd6f14245a2e3346c",
    url = "https://api.darksky.net/forecast/",
    lati = hive.lat,
    // 29.7604267,
    longi = hive.lng,
    api_call = url + apiKey + "/" + lati + "," + longi;

  var clientServerOptions = {
    uri: api_call,
    body: JSON.stringify({}),
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  request(clientServerOptions, function(error, response) {
    // console.log(error, response);
    let data = JSON.parse(response.body);
    weather = {
      temp: data.currently.temperature,
      summary: data.currently.summary
    };
    console.log(weather);
    return;
  });
};

board.on("ready", () => {
  var lcd = new five.LCD({
    pins: ["a2", "a3", "a4", "a5", "a6", "a7"]
  });

  var monitor = new five.Multi({
    controller: "BME280",
    freq: 5000
  });

  const saveToDb = postData => {
    var clientServerOptions = {
      uri: "http://10.185.5.111:5000/api/records/", //check ip address ipconfig getifaddr en0
      body: JSON.stringify(postData),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    };
    request(clientServerOptions, function(error, response) {
      // console.log(error, response);
      return;
    });
  };

  monitor.on("data", function() {
    ///Adjust monitor freq and post a Record instance in this method
    console.log("  Temperature  : ", this.thermometer.fahrenheit);
    console.log("--------------------------------------");
    console.log(" Humidity     : ", this.hygrometer.relativeHumidity);
    console.log("--------------------------------------");

    let recordData = {
      temperature: this.thermometer.fahrenheit,
      humidity: this.hygrometer.relativeHumidity,
      hiveId: "5c3811a746b06c63be792b89",
      created_at: Date.now()
    };
    saveToDb(recordData);

    fetchHiveInfo().then(() => fetchWeather());
    // fetchWeather();
  });

  var clients = new Set();
  var updated = Date.now() - 5000;

  //   io.on("connection", socket => {
  //     clients.add(socket);
  //     console.log("New client connected");
  //     socket.on("disconnect", () => {
  //       console.log("Client disconnected");
  //     });
  //   });

  monitor.on("change", function() {
    lcd.cursor(0, 0).print(`Temp: ${monitor.thermometer.fahrenheit}`);
    lcd.cursor(1, 0).print(`Hum: ${monitor.hygrometer.relativeHumidity}`);
    var now = Date.now();

    if (now - updated >= 5000) {
      updated = now;
      //     clients.forEach(socket => {
      //       socket.emit("report", {
      //         thermometer: monitor.thermometer.fahrenheit,
      //         hygrometer: monitor.hygrometer.relativeHumidity
      //       });
      //     });
    }
  });

  //   io.on("connection", socket => {
  // Allow up to 5 monitor sockets to
  // connect to this enviro-monitor server
  // if (clients.size < 5) {
  //   clients.add(socket);
  //   // When the socket disconnects, remove
  //   // it from the recipient set.
  // }

  // socket.on("disconnect", () => clients.delete(socket));
  //   });

  var port = 8000;
  server.listen(port, () => {
    console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}`);
  });

  process.on("SIGINT", () => {
    server.close();
  });
});
