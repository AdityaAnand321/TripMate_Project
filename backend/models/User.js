const { Schema, model } = require('mongoose');

const BookingSchema = new Schema({
  id: String,
  booking: Schema.Types.Mixed,
}, { _id: false });

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  phone: { type: String },
  country: { type: String },
  city: { type: String },
  avatar: { type: String },
  favourites: { type: [Schema.Types.Mixed], default: [] },
  bookings: { type: [Schema.Types.Mixed], default: [] },
}, { timestamps: true });

module.exports = model('User', UserSchema);
