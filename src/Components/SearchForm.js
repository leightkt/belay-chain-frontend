import './SearchForm.css'

function SearchForm ({ handleChange, email, first_name, last_name, findUser }) {

    return (
        <form className="lookup" onSubmit={ findUser }>
            <h2>Look Up User</h2>
            <label>Email:</label>
            <input type="email" name="email" placeholder="EMAIL" onChange={ handleChange } value={ email }/>
            <label>First Name:</label>
            <input type="text" name="first_name" placeholder="FIRST NAME" onChange={ handleChange } value={ first_name }/>
            <label>Last Name:</label>
            <input type="text" name="last_name" placeholder="LAST NAME" onChange={ handleChange } value={ last_name }/>
            <input type="submit" value="FIND MEMBER" />
        </form>
    )
}

export default SearchForm