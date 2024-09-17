import { useState } from 'react'
import Filter from './Components/FIlter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [searchQuery, setSearchQuery] = useState('')

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
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

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

      <h2>Add new:</h2>
        
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