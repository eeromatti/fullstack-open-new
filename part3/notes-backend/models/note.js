const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to MangoDB')
mongoose.connect(url)
  .then(result => {
    console.log('connected to MangoDB')
  })
  .catch((error) => {
    console.log('error connecting to MangoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note  // Huomaa, että malli viedään oikein