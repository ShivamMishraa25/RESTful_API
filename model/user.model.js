import mongoose from "mongoose"; // import mongoose to create schema

// define user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    hobby: String
});

// create user model with user schema
const userModel = mongoose.model("users", userSchema);

export default userModel; // export model to be used in controller