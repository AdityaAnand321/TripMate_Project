const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripmate_dev';

let state = 'idle'; // idle | connecting | connected | error
let lastError = null;

async function connect(options = {}) {
  const { retries = 6, delayMs = 1000 } = options;
  if (state === 'connected') return true;
  state = 'connecting';
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      state = 'connected';
      lastError = null;
      console.log('Connected to MongoDB');
      return true;
    } catch (err) {
      lastError = err;
      const msg = err && err.message ? err.message : String(err);
      console.error(`MongoDB connection failed (attempt ${attempt}/${retries}): ${msg}`);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs * attempt));
      }
    }
  }
  state = 'error';
  return false;
}

function getDbState() {
  return {
    state,
    uri: MONGO_URI,
    lastError: lastError ? String(lastError.message || lastError) : null,
  };
}

module.exports = { connect, mongoose, getDbState };
