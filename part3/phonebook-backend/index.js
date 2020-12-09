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

app.get('/info', (req, res) =>
{
  res.send(
    `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date}</p>
    `
  )
})

app.get('/api/persons', (req, res) =>
{
  Person.find({}).then(persons =>
    {
      res.json(persons)
    })
})

app.post('/api/persons/', (req, res) =>
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

  newPerson.save().then(savePerson =>
    {
      res.json(savePerson)
    }
  )
})

app.get('/api/persons/:id', (req, res) =>
{
  const id = req.params.id
  
  Person.find({ _id: id }).then( person =>
    {
      res.json(person)
    }
  )
})

app.delete('/api/persons/:id', (req, res) =>
{
  const id = req.params.id

  Person.deleteOne({ _id: id }).then(result =>
    {
      res.json(result)
    })

})

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>
{
  console.log(`Server running on ${PORT}`)
})