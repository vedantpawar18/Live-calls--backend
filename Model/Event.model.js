const mongoose = require("mongoose");

const EventModel = mongoose.model("Event",mongoose.Schema({
    Eventname: { type: String, require: true },
    Description: { type: String, require: true },
    Date: { type: String, require: true },
    StartTime: { type: String, require: true },
    EndTime: { type: String, require: true },
    Limit: { type: Number, require: true },
    Enrolled: { type: Array, require: true },
  })
);

module.exports = EventModel
