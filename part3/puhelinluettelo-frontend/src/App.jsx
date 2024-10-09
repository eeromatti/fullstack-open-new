import { useState } from 'react'
import React, { useEffect } from 'react';
import axios from 'axios'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <input
    value={props.filter}
    onChange={props.handleFilterChange}
    placeholder="Filter by name"
  />
  )
}

const AddPerson = (props) => {
  return(
    <form onSubmit={props.addName}>
          <input 
            value={props.newName} 
            onChange={props.handleNameChange}
            placeholder="Name"
          />
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
            placeholder="Number"
          />
          <button type="submit">add</button>
        </form>
    )
  }

const PersonsToShow = (props) => {
  return (
    <li>
      {props.person.name} {props.person.number} 
      <button
        style={{ marginLeft: '10px' }} 
        onClick={() => {
          if (window.confirm(`Delete ${props.person.name}?`))
            props.delPerson(props.person)
        }}
        >
         delete
      </button>
    </li>
    )
  }

const Notification = ({ message }) => {
  if (message == null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
  
const App = () => {  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('new name')
  const [newNumber, setNewNumber] = useState('new number')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [errorMessage, setErrorMessage] = useState('something happened...')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        const persons_init = response
        setPersons(persons_init)
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
    }
    const existingPerson = persons.find((person) => person.name === newObject.name)
    if (!existingPerson) {
        personService
          .create(newObject)
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Added ${newObject.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
          })
    } 
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {  
        const updatedObject = { ...existingPerson, number: newNumber };
        // console.log(updatedObject)
          personService
            .update(existingPerson.id, updatedObject)
            .then(response => {
              // console.log("response", response)
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
              setNewName('')
              setNewNumber('')
              setErrorMessage(`Updated ${existingPerson.name}`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 2000)
              })
            .catch(error => {
              console.error('Error updating person:', error)
            })
        }
      }
    }

    const delPerson = (pers) => {
      personService.del(pers.id)
          .then(() => {
              setPersons(persons.filter(person => person.id !== pers.id));
              setErrorMessage(`Removed ${pers.name}`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 2000)
          })
          .catch(error => {
              console.error(`Failed to delete person with id ${pers.id}:`, error);
          });
  }

    
  const personsToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

  // käsittelyfunktiot
  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <AddPerson addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {personsToShow.map((person) => (
          <PersonsToShow 
          key = {person.id} 
          person={person}
          delPerson={delPerson}
          />
        ))}
      </ul>
    </div>
  )
}

export default App