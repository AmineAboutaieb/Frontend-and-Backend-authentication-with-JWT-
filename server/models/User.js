const mongoose = require("mongoose");
const uuid = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    roles: {
      type: [String],
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timeseries: true }
);

userSchema.virtual("password").set(function (password) {
  this._password = password;
  this.salt = uuid.v1();
  this.hashedPassword = this.encryptPassword(password);
});

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {}
  },
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) == this.hashedPassword;
  },
};

module.exports = mongoose.model("User", userSchema);
