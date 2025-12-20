const { Schema, model } = require('mongoose');

const TripSchema = new Schema({
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }, // e.g., "3N/4D"
  seatsAvailable: { type: Number, default: 0 },
  description: { type: String },
  image: { type: String },
  // optional fields
  city: { type: String },
  state: { type: String },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = model('Trip', TripSchema);
