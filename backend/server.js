require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { connect, getDbState } = require('./models/db');

const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const app = express();

app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Health endpoint with DB status
app.get('/api/health', (req, res) => {
  const db = getDbState();
  const ok = db.state === 'connected';
  res.status(ok ? 200 : 503).json({ ok, db });
});

// Mount API routes
app.use('/api', routes);

// Start server immediately; connect to DB in background with retries
app.listen(PORT, () => {
  console.log(`TripMate backend running on http://localhost:${PORT}`);
});

connect({ retries: 8, delayMs: 1000 })
  .then((ok) => {
    if (!ok) {
      const db = getDbState();
      console.error('MongoDB not connected after retries:', db.lastError);
    }
  })
  .catch((err) => {
    console.error('Unexpected DB connection error', err);
  });
