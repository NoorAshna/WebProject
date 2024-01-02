const { model, Schema } = require("mongoose")

const UserModel = model(
  "users",
  new Schema({
    userId:{
      type:String,
    },
    username: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    email: {
      type: String
    }, 
    role: {
      type: String,
      required: true,
     default:["user"]
    },
  })
)

module.exports = { UserModel }
