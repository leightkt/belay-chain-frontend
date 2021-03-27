
const certifications = (state=[], action) => {
	switch(action.type) {
		case "SET_CERTIFICATIONS":
			return action.certifications
		default: 
			return state
	}
}

export default certifications