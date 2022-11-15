const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then((con: any) => {
        console.log("con", con);
        if (con) {
          console.log("DataBase connected successfully!");
        }
      })
      .catch(() => {
        console.log("error");
      });
  } catch (error) {
    process.exit;
  }
};

module.exports = connectDB;
