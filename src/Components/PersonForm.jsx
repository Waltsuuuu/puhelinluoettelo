import PropTypes from 'prop-types';


const PersonForm = ( {addName, handleNewName, newName, handleNewNumber, newNumber} ) => {
    
    return (
        <form onSubmit={addName} className="PhoneBookForm">
            <div>
                Name:
                <input onChange={handleNewName} value={newName}/>
            </div>
            <div>
                Number:
                <input onChange={handleNewNumber} value={newNumber}/>
            </div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )
}

PersonForm.propTypes = {
    
}


export default PersonForm