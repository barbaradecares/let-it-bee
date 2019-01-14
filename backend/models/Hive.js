const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hiveSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: { type: String },
  location: { type: String },
  lat: { type: String },
  lng: { type: String },
  currentTemperature: { type: Number },
  currentHumidity: { type: Number },
  currentWeight: { type: Number }
});

const Hive = mongoose.model("Hive", hiveSchema);

Hive.find({}, (err, hives) => {
  if (err) {
    // console.log(err);
  } else if (hives.length === 0) {
    const hive1 = new Hive({
      userId: "5c37cae112132f5229142589",
      name: "My first hive",
      location: "Anchorage",
      currentTemperature: 70,
      currentHumidity: 45,
      currentWeight: 200
    });
    const hive2 = new Hive({
      userId: "5c37cae112132f5229142589",
      name: "My second hive",
      location: "Houston",
      currentTemperature: 20,
      currentHumidity: 100000,
      currentWeight: 150
    });
    hive1.save();
    hive2.save();
    console.log("Seeded DB with 2 new hives.");
  }
});
module.exports = Hive;
