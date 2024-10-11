const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://eki:${password}@mangodb.ml2nd.mongodb.net/Notes?retryWrites=true&w=majority&appName=MangoDB`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length > 3) {
  const note = new Note({
    content: process.argv[3],
    important: true
    })
  
    note.save().then(result => {
      console.log(`added ${note.content} to Notes`)
      mongoose.connection.close()
    })
  }
  
if (process.argv.length == 3) {
  console.log('notes:')
  Note.find({}).then(result => {
    result.forEach(note => {
    console.log(`${note.content}`)
    })
    mongoose.connection.close()
  })
}


