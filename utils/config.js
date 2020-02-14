if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const MONGODB_URI = () => {
  switch (process.env.NODE_ENV) {
  case 'prod' || 'production':
    return process.env.MONGO_URI_PROD;
  case 'dev' || 'development':
    return process.env.MONGO_URI_DEV;
  case 'test' || 'testing' || 'stag' || 'staging':
    return process.env.MONGO_URI_TEST;
  default:
    return process.env.MONGO_URI_DEV;
  }
};

const PORT = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
  ? process.env.PORT
  : 4010;
const SECRET = process.env.SECRET;

module.exports = {
  mongo: MONGODB_URI(), port: PORT, secret: SECRET, env: process.env.NODE_ENV
};
