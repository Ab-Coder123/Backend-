const mongoose = require('mongoose')

const UserSchemadata = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    avatar: {
      type: String,
      default: ''
    },

    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const UserSchema = mongoose.model('User', UserSchemadata)
module.exports = UserSchema
