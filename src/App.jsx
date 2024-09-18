import { useState, useEffect } from 'react'
import Filter from './Components/FIlter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personsService from './Service/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const normalizeNumber = (number) => {
    // Remove spaces, dashes, etc. for comparison
    return number.replace(/[\s-]+/g, '')
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    )

    const numberExists = persons.some(person =>
      normalizeNumber(person.number) === normalizeNumber(newNumber)
    )

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else if (numberExists) {
      alert('Number already exists in phonebook')
    } else {
      personsService
      .create(nameObject)
      .then(initialPerson => {
        console.log(initialPerson)
        setPersons(persons.concat(initialPerson))
        setNewName('')
        setNewNumber('')
      })
    }
    

  }

  /* 
        personsService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
  */

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
   )


  return (
    <div className="PhoneBookWrapper">
      <h2>Phonebook</h2>

      <Filter handler={handleSearchQuery} />

      <h2>Add new</h2>
        
      <PersonForm 
      addName={addName} 
      handleNewName={handleNewName} 
      newName={newName}
      handleNewNumber={handleNewNumber}
      newNumber={newNumber}
      />

      <h2>Numbers</h2>
      
      <Persons filteredPersons={filteredPersons}/>
    </div> 
  )

}

export default App