require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456"
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523"
//   },
//   {  
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345"
//   },
//   {
//     id: 4,
//     name: "Mary Poppendick",
//     number: "39-23-6423122"
//   }
// ]

app.get('/info', (req, res, next) =>
{
  Person.count({})
    .then(result =>
    {
      res.send(
        `
        <p>Phonebook has info for ${result} people</p>
        <p>${new Date}</p>
        `
      )
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) =>
{
  Person.find({})
    .then(persons =>
    {
      res.json(persons)
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) =>
{
  const body = req.body

  if (!body.name)
  {
    return res.status(400).json(
      {
        error: 'name is missing'
      }
    )
  }

  if (!body.number)
  {
    return res.status(400).json(
      {
        error: 'number is missing'
      }
    )
  }

  const newPerson = new Person(
    {
      name: body.name,
      number: body.number,
    })

  newPerson.save()
    .then(savePerson =>
    {
      res.json(savePerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) =>
{
  const id = req.params.id
  
  Person.findById(id)
    .then(person =>
    {
      res.json(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) =>
{
  const body = req.body
  const id = req.params.id

  if (!body.number)
  {
    return res.status(400).json(
      {
        error: 'number is missing'
      }
    )
  }

  const person = 
  {
    name: body.name,
    number: body.number
  }

  console.log(person)

  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson =>
    {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) =>
{
  const id = req.params.id

  Person.findByIdAndDelete(id)
    .then(() =>
    {
      res.status(204).end()
    })
    .catch(error => next(error))

})

const errorHandler = (err, req, res, next) =>
{
  console.log(err)

  if (err.name === 'CastError' && err.kind === 'ObjectId')
  {
    return res.status(400).send({ error: 'error id' })
  }
  else if (err.name === 'ValidationError')
  {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>
{
  console.log(`Server running on ${PORT}`)
})