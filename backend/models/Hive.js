const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hiveSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: { type: String },
  location: { type: String },
  currentTemperature: { type: Number },
  currentHumidity: { type: Number },
  currentWeight: { type: Number }
});

const Hive = mongoose.model("Hive", hiveSchema);

module.exports = Hive;
