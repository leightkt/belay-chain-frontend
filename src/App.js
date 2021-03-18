import './App.css';
import { Component } from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';



class App extends Component {
	state = {
		user: {
			id: "",
			role: ""
		},
		certifications: []
	}
	
	setRole = (role) => {
		this.setState({ user: { role } })
	}

	setUserID = (id) => {
		this.setState({ user: { id }})
	}

	logOut = () => {
		localStorage.removeItem('token')
		this.setState({
			user: {
				id: "",
				role: ""
			},
			certifications: []
		})
	}

	

	render() {
		return (
		<div className="App">
			<Header	/>
			<Main	setRole={ this.setRole } role={ this.state.user.role } setUserID={ this.setUserID }/>
			{
				this.state.user.id
				? <button onClick={ this.logOut }>LOG OUT</button>
				: null
			}
			<Footer	/>
		</div>
		);
	}
}

export default App;
