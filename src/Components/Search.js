import './Search.css'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_SEARCHTERM } from '../Redux/Types'

function Search () {
    const dispatch = useDispatch()
    const searchTerm = useSelector(state => state.searchTerm)

    const updateSearchTerm = (event) => {
        dispatch({ type: UPDATE_SEARCHTERM, term: event.target.value })
    }

    return(
        <form className="search-form">
            <label>Search Term</label>
            <input type="text" name="search-term" className="search-term" onChange={ updateSearchTerm } value={ searchTerm } placeholder="SEARCH"></input>
        </form>
    )
}

export default Search