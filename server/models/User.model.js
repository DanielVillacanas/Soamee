const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favBooks: {
      type: [Schema.Types.ObjectId],
      ref: "Book",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
