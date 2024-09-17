

const Persons = ( {filteredPersons} ) => {
    console.log(typeof filteredPersons)


    return (
        <>
        {filteredPersons.map((person) => (
        <p key={person.name}>
        {person.name} {person.number}</p>
        ))}
        </>
    )
}

export default Persons


/*       {filteredPersons.map((person) => (
          <p key={person.name}>
          {person.name} {person.number}</p>
        ))} */