const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'PORT', 'NODE_ENV', 'DB_URL', 'DB_NAME', 'DB_PASS', 'JWT_TOKEN',
  'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET',
  'EMAIL_SERVICE', 'EMAIL_USER', 'EMAIL_PASSWORD', 'EMAIL_FROM_NAME',
];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  dbPass: process.env.DB_PASS,
  jwtToken: process.env.JWT_TOKEN,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM_NAME,
  },
};