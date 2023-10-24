const dotenv = require("dotenv");
const { PORT, DB_NAME, MONGO_URL, SALT, SECRET_KEY } = dotenv.config()?.parsed;

// NODE_ENV, SECRET_KEY

module.exports = {
  port: PORT,
  db_name: DB_NAME,
  //   node_env: NODE_ENV,
  mongo_url: MONGO_URL,
  //   secret_key: SECRET_KEY,
  salt: SALT,
  secret_key: SECRET_KEY,
};
