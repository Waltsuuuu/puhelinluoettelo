import PropTypes from 'prop-types'

const Persons = ( {filteredPersons} ) => {


    return (
        <>
        {filteredPersons.map((person) => (
        <p key={person.id}>
        {person.name} {person.number}</p>
        ))}
        </>
    )
}

Persons.propTypes = {
    filteredPersons: PropTypes.array
}

export default Persons


/*       {filteredPersons.map((person) => (
          <p key={person.name}>
          {person.name} {person.number}</p>
        ))} */