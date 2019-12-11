const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/justgerrit/image/upload/v1575981209/profilepictures/gerrit.jpg"
    },
    quote: String,
    geolocation: [Number],
    chatroom: {
      type: Schema.Types.ObjectId,
      ref: "Chatroom"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
