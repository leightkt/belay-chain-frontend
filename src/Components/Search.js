import './Search.css'

function Search ({ updateSearchTerm, searchTerm }) {

    return(
        <form className="search-form">
            <label>Search Term</label>
            <input type="text" name="search-term" onChange={ updateSearchTerm } value={ searchTerm } placeholder="SEARCH"></input>
        </form>
    )
}

export default Search