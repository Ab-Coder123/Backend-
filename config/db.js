const mongoose = require('mongoose')

const Mongodb = async () => {
  try {
   await  mongoose.connect(process.env.MONGODB_URl).then(() => {
      console.log('sucsess connected to db ')
    })
  } catch (error) {
    console.error('Database Error:', error.message)
    process.exit(1)
  }
}

module.exports = Mongodb
