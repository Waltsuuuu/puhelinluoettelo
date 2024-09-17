import PropTypes from 'prop-types';


const Filter = ( {handler} ) => {
    return (
    <div>
        Filter by name
        <input type='text' onChange={handler}></input>
    </div>
    )
}

Filter.propTypes = {
    handler: PropTypes.func
}

export default Filter


/* <h2>Phonebook</h2>
Filter by name
<input type="text" onChange={handleSearchQuery}></input> */