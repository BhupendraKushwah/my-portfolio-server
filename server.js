/**
 * server.js — Production‑grade Express entry point
 * -----------------------------------------------
 *  ✓ Loads environment & DB configs
 *  ✓ Adds security, logging, compression, CORS, rate‑limiting
 *  ✓ Serves static files & file uploads
 *  ✓ Centralised 404 + error handlers
 *  ✓ Graceful shutdown on SIGTERM / unhandledRejection
 */

require('dotenv').config();                 // .env first — keep at the top
require('./configs/environment.config');    // any additional env logic
require('./configs/database.config');       // connects to Mongo & exposes errors

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/error.middleware'); // you created this
const routes = require('./routes');         // index.js that re‑exports all routes

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------------------------------------------------------------- */
/*                             1. Express Settings                            */
/* -------------------------------------------------------------------------- */

app.set('trust proxy', 1); // if behind Nginx / Heroku / etc.

/* -------------------------------------------------------------------------- */
/*                           2. Global Middlewares                            */
/* -------------------------------------------------------------------------- */

// Security headers
app.use(helmet());

// GZIP / Brotli (if supported)
app.use(compression());

// CORS
app.use(
  cors({
    origin: process.env.CORS_WHITELIST?.split(',') || '*',
    credentials: true,
  })
);

// Body parsers
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Rate limiting (basic)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 1000,                // adjust for your traffic
});
app.use('/api', limiter);

/* ----------------------------- Request Logging ---------------------------- */
// Log only in production & staging
if (process.env.NODE_ENV !== 'test') {
  const logStream = fs.createWriteStream(
    path.join(__dirname, 'logs', 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: logStream }));
}

/* -------------------------------------------------------------------------- */
/*                            3. Static File Serve                            */
/* -------------------------------------------------------------------------- */

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public'))); // your frontend build

/* -------------------------------------------------------------------------- */
/*                              4. API Routes                                 */
/* -------------------------------------------------------------------------- */

app.use('/api', routes);

/* -------------------------------------------------------------------------- */
/*                       5. Handle 404 & Global Errors                        */
/* -------------------------------------------------------------------------- */

app.use((req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});


app.use(errorHandler);

/* -------------------------------------------------------------------------- */
/*                     6. Start Server & Graceful Exit                        */
/* -------------------------------------------------------------------------- */

const server = app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

// Unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection!', err);
  shutdown(1);
});

// Graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown(code = 0) {
  console.log('👋 Shutting down gracefully…');
  server.close(() => {
    console.log('💤 All requests finished, process exiting');
    process.exit(code);
  });
  // Force‑close after 10 s
  setTimeout(() => process.exit(1), 10_000).unref();
}
