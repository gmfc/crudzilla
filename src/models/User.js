import mongoose from 'mongoose'
import md5 from 'md5'
const Schema = mongoose.Schema

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

User.methods.checkPassword = function (password) {
  return (this.password === md5(password))
}

User.methods.hashPassword = function (password) {
  return md5(password)
}

User.methods.getSessionData = function () {
  let data = {
    name: this.name,
    logged: true
  }
  return data
}

User.methods.getSortingAttr = function () {
  return 'username'
}

User.pre('save', function (next) {
  this.password = md5(this.password)
  next()
})

mongoose.model('User', User)
