const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "First Name is required."],
    },
    last_name: {
      type: String,
      required: [true, "Last Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    address: {
      street: String,
      house_number: String,
      postal_code: String,
      city: String,
      state: String,
      country: String,
      text: String,
    },
    phone_number: {
      country_code: String,
      number: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dxjse9tsv/image/upload/v1625073462/avatars/default-avatar.png",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
