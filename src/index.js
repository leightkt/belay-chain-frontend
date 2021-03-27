import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

const role = (state="", action) => {
	switch (action.type) {
		case "SET_ROLE":
			return action.role
		default:
			return state
	}
}

const certifications = (state=[], action) => {
	switch(action.type) {
		case "SET_CERTIFICATIONS":
			return action.certifications
		default: 
			return state
	}
}

const user = (state={}, action) => {
	switch(action.type) {
		case "SET_USER":
			return action.user
		default:
			return state
	}
}

const searchTerm = (state="", action) => {
	switch (action.type) {
		default:
			return state
	}
}

const rootReducer = combineReducers({
	role,
	user,
	certifications,
	searchTerm
})

const store = createStore(rootReducer)

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Provider store={ store }>
				<App />
			</Provider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
