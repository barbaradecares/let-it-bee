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

application.use(Express.static(path.join(__dirname, "/app")));
application.use("/vendor", Express.static(__dirname + "/node_modules/"));

board.on("ready", () => {
  var lcd = new five.LCD({
    pins: ["a2", "a3", "a4", "a5", "a6", "a7"]
  });

  var monitor = new five.Multi({
    controller: "BME280",
    freq: 5000
  });

  var clients = new Set();

  monitor.on("data", function() {
    ///Adjust monitor freq and post a Record instance in this method
    console.log("  Temperature  : ", this.thermometer.fahrenheit);
    console.log("--------------------------------------");
    console.log(" Humidity     : ", this.hygrometer.relativeHumidity);
    console.log("--------------------------------------");
  });

  var updated = Date.now() - 5000;

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

  io.on("connection", socket => {
    // Allow up to 5 monitor sockets to
    // connect to this enviro-monitor server
    if (clients.size < 5) {
      clients.add(socket);
      // When the socket disconnects, remove
      // it from the recipient set.
      socket.on("disconnect", () => clients.delete(socket));
    }
  });

  var port = 8000;
  server.listen(port, () => {
    console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}`);
  });

  process.on("SIGINT", () => {
    server.close();
  });

  //   monitor.on("change", function() {
  //     console.log("  Temperature  : ", this.thermometer.fahrenheit);
  //     console.log("--------------------------------------");
  //     console.log(" Humidity     : ", this.hygrometer.relativeHumidity);
  //     console.log("--------------------------------------");
  //   });
});
