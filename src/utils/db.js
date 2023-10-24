const mongoose = require("mongoose");
const { mongo_url, db_name } = require("../config");

mongoose.connect(`${mongo_url}/${db_name}`, { useNewUrlParser: true });

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');`

const db = mongoose.connection;

db.on("error", console.error.bind(console, "DB connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});

module.exports = db;
