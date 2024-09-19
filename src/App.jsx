import { useState, useEffect } from 'react'
import Filter from './Components/FIlter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personsService from './Service/persons'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [searchQuery, setSearchQuery] = useState('')
  const [addedNotification, setAddedNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)



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
            setAddedNotification(`Updated ${newName}`)
            setTimeout(() => {
              setAddedNotification(null)
            }, 4000)
          })
          .catch(() => {
            alert(`Failed to update ${newName}`)
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
        setAddedNotification(`Added ${newName}`)
        setTimeout(() => {
          setAddedNotification(null)
        }, 4000)
      })
      .catch(() => {
        alert(`Failed to add ${newName}`)
      });
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

  const handleDelete = (id, name) => {
    console.log('You pressed delete')
    if (window.confirm(`Delete ${name}?`)){
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          setErrorNotification(
            `Information of ${name} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorNotification(null)
          }, 4000)
          //Filters out the person with the id that was not deleted due to them not existing in the database
          setPersons(persons.filter(person => person.id !== id))
        })
    }

    
  }


  return (
    <div className="PhoneBookWrapper">
      <h2>Phonebook</h2>

      <Filter handler={handleSearchQuery} />

      <h2>Add new</h2>

      <Notification message={addedNotification} type="success"/>
      <Notification message={errorNotification} type="error"/>  


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