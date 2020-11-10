import React from 'react'

const Person = ({ persons, handleDelete }) =>
{
  const remove = (id, name) =>
  {
    if(window.confirm(`delete ${name}`))
    {
      handleDelete(id)
    }
  }
  return (
    <>
      {persons.map(person => 
        <div key={person.name}>{person.name} {person.number} <button onClick={() => remove(person.id, person.name)}>delete</button></div>
      )}
    </>
  )
}

export default Person