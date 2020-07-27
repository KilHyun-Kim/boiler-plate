const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 도중의 공백을 없애주는 역할
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0, // 기본값
  },
  image: String,
  token: {
    // 유효성
    type: String,
  },
  tokenExp: {
    // 유효 기간
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
// 다른곳에서 사용할 수 있도록 exports 해줌
