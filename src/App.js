import './App.css';
import { Component } from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginContainer from './Containers/LogInContainer';
import Profile from './Profile';

const backendUsersURL = 'http://localhost:9000/'

class App extends Component {
	state = {
		user: {
			id: "",
			role: "",
		},
		certifications: []
	}

	componentDidMount() {
		this.authoriz_user()
	}
	
	authoriz_user = () => {
		if(localStorage.getItem("token")) {
			fetch(`${backendUsersURL}profile`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${localStorage.token}`
				}
			})
			.then(response => response.json())
			.then(data => {
				this.setUser(data.user)
			})
		}
	}

	setRole = (role) => {
		this.setState({ user: { role } })
	}

	setUser = (user) => {
		this.setState({ user })
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
			<main>
				{
					this.state.user.id
					?
					<Profile />
					:
					<LoginContainer	setRole={ this.setRole } role={ this.state.user.role } setUser={ this.setUser }/>
				}
			{
				this.state.user.id
				? <button onClick={ this.logOut }>LOG OUT</button>
				: null
			}
			<Footer	/>
			</main>
		</div>
		);
	}
}

export default App;
