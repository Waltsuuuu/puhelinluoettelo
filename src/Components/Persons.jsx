import PropTypes from 'prop-types'

const Persons = ( {filteredPersons, handleDelete} ) => {


    return (
        <>
        {filteredPersons.map((person) => (
        <p key={person.id}>
        {person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Delete</button></p>
        ))}
        </>
    )
}

Persons.propTypes = {
    filteredPersons: PropTypes.array,
    handleDelete: PropTypes.func
}

export default Persons


/*       {filteredPersons.map((person) => (
          <p key={person.name}>
          {person.name} {person.number}</p>
        ))} */