import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() =>
  {
    personService
      .getAll()
      .then(initial =>
        {
          setPersons(initial)
        })
  },[])

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilterName(event.target.value)
  const handleNewPerson = (event) =>
  {
    event.preventDefault()

    const personObject =
    {
      name: newName,
      number: newNumber,
    }
    const findPerson = persons.find(person => person.name === newName)
    
    if(findPerson)
    {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        personService
          .update(findPerson.id, personObject)
          .then(updated =>
          {
            setPersons(persons.map(person => person.id !== findPerson.id ? person : updated))
            setNewName('')
            setNewNumber('')
            setMessage(`updated ${findPerson.name} with ${personObject.number}`)
            setMessageType('success')
            setTimeout(() => setMessage(null), 3000)
          })
          .catch(error =>
          {
            setMessage(`Information of  ${findPerson.name} has already been removed from server`)
            setMessageType('error')
            setTimeout(() => setMessage(null), 3000)
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(response =>
      {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${personObject.name}`)
        setMessageType('success')
        setTimeout(() => setMessage(null), 3000)
      })
      .catch(error =>
      {
        setMessage(`Adding ${personObject.name} failed`)
        setMessageType('error')
        setTimeout(() => setMessage(null), 3000)
      })

  }

  const handleDelete = (id) =>
  {
    personService
      .del(id)
      .then(() =>
      {
        const updatedPersons = persons.filter(person => person.id !== id)
        setPersons(updatedPersons)
        setMessage('delete successfully')
        setMessageType('success')
        setTimeout(() => setMessage(null), 3000)
      })
      .catch(error =>
      {
        setMessage('deleting failed')
        setMessageType('error')
        setTimeout(() => setMessage(null), 3000)
      })
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().indexOf(filterName.toLowerCase()) > -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <Filter handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        handleNewPerson={handleNewPerson}
        newName={newName}
        newNumber={newNumber}
        />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App