const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
require('dotenv').config(); // Load environment variables

mongoose.connect(process.env.MONGODB_URI);

const userSchema = mongoose.Schema({  
  email: String,
  username: String,
  name: String,
  phone: Number,
  password: String,
  profile_picture: String,
  boards: {
    type: Array,
    default: [],
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }]
});

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
