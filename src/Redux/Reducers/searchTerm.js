import { UPDATE_SEARCHTERM } from "../Types"

const searchTerm = (state="", action) => {
	switch (action.type) {
		case UPDATE_SEARCHTERM:
			return action.term
		default:
			return state
	}
}

export default searchTerm