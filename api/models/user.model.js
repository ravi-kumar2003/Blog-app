import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    ProfilePicture: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1734360013~exp=1734363613~hmac=b8ce8f8738760f9fc3cbf6de5951506384dd0b5b0b1f5d915a539d1a0e4f80ee&w=740",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
