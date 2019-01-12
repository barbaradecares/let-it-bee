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
var socket = require("socket.io");

var app = new Express();
var server = new http.Server(app);
var io = new socket(server);
io.on("connection", socket => {
  //   clients.add(socket);
  //   socket.on("disconnect", () => clients.delete(socket));
  console.log("test!");
});

app.use(Express.static(path.join(__dirname, "/app")));
app.use("/vendor", Express.static(__dirname + "/node_modules/"));

board.on("ready", () => {
  //Attempt of connection
  //   var clients = new Set();
  var updated = Date.now() - 5000;

  var lcd = new five.LCD({
    pins: ["a2", "a3", "a4", "a5", "a6", "a7"]
  });

  var monitor = new five.Multi({
    controller: "BME280",
    freq: 15000
  });

  const saveToDb = postData => {
    var clientServerOptions = {
      uri: "http://10.185.4.163:5000/api/records/",
      body: JSON.stringify(postData),
      method: "POST",
      headers: {
        "Content-Type": "app/json"
      }
    };
    request(clientServerOptions, function(error, response) {
      //   console.log(error, response);
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
      created_at: Date.now
    };

    saveToDb(recordData);
  });

  monitor.on("change", function() {
    lcd.cursor(0, 0).print(`Temp: ${monitor.thermometer.fahrenheit}`);
    lcd.cursor(1, 0).print(`Hum: ${monitor.hygrometer.relativeHumidity}`);
    var now = Date.now();

    if (now - updated >= 5000) {
      updated = now;
      clients.forEach(socket => {
        socket.emit("report", {
          thermometer: monitor.thermometer.fahrenheit,
          hygrometer: monitor.hygrometer.relativeHumidity
        });
      });
    }
  });

  var port = 3000;
  server.listen(port, () => {
    console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}`);
  });

  process.on("SIGINT", () => {
    server.close();
  });
});
