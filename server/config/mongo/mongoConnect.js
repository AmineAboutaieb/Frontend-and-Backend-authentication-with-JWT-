const mongoose = require("mongoose");
const colors = require("colors");

const connectMongoDB = async () => {
  try {
    const mongoConnect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB connected : ${mongoConnect.connection.host}`.bgCyan.underline
    );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connectMongoDB;
