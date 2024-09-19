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

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    //Finds the person object with the same name (if it exists)
    const nameExists = persons.find(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    );

    console.log(nameExists)
  
    if (nameExists) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one?`
      );
  
      if (confirmUpdate) {
        const updatedPerson = { ...nameExists, number: newNumber };
  
        personsService
          .update(nameExists.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== nameExists.id ? person : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            alert(`Failed to update ${newName}'s number`);
          });
      }
    } else {
      personsService
      .create(nameObject)
      .then(initialPerson => {
        console.log(initialPerson)
        setPersons(persons.concat(initialPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert(`Failed to add ${newName}`);
      });
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

  const handleDelete = (id, name) => {
    console.log('You pressed delete')
    if (window.confirm(`Delete ${name}?`)){
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }

    
  }


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
      
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div> 
  )

}

export default App