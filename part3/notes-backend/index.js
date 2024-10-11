require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message})
  }

  next(error)
}


app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})


app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
  .catch(error => next(error))
})


app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;

  // Tarkista, että id on validi
  if (!mongoose.isValidObjectId(id)) {
    return response.status(400).json({ error: 'invalid id format' });
  }

  // Käytä findByIdAndDelete -metodia
  Note.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        response.status(204).end(); // 204 No Content
      } else {
        response.status(404).json({ error: 'note not found' }); // 404 Not Found
      }
    })
    .catch(error => {
      response.status(500).json({ error: 'internal server error' }); // 500 Internal Server Error
    });
});

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})