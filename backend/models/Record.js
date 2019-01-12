const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  hiveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hive"
  },
  temperature: { type: Number },
  humidity: { type: Number },
  weight: { type: Number },
  created_at: { type: Date },
  notes: [{ type: String }]
});

const Record = mongoose.model("Record", recordSchema);

Record.find({}, (err, records) => {
  // console.log(err, records);
});
module.exports = Record;
