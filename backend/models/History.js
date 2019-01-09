const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  hiveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hive"
  },
  temperature: { type: Number },
  humidity: { type: Number },
  weight: { type: Number },
  notes: [{ type: String }]
});

const History = mongoose.model("History", historySchema);

module.exports = History;
