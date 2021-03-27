import { ADD_CERTIFICATION, SET_CERTIFICATIONS } from '../Types'

const certifications = (state=[], action) => {
	switch(action.type) {
		case SET_CERTIFICATIONS:
			return action.certifications
		case ADD_CERTIFICATION:
			return [ ...state, action.certification ]
		default: 
			return state
	}
}

export default certifications