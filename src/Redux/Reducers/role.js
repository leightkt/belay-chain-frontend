
const role = (state="", action) => {
	switch (action.type) {
		case "SET_ROLE":
			return action.role
		default:
			return state
	}
}

export default role