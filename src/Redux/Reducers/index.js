import { combineReducers } from 'redux'
import role from './role'
import user from './user'
import certifications from './certifications'
import searchTerm from './searchTerm'

export default combineReducers({
	role,
	user,
	certifications,
	searchTerm
})
