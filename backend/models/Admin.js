const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  role: { type: String, default: 'admin' },
  phone: { type: String },
  department: { type: String },
  permissions: { type: [String], default: [] },
  lastLogin: { type: Date },
}, { timestamps: true });

AdminSchema.index({ userId: 1 }, { unique: true });

module.exports = model('Admin', AdminSchema);
