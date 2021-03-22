import './App.css';
import { Component } from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginContainer from './Containers/LogInContainer';
import Profile from './Containers/Profile';

const backendUsersURL = 'http://localhost:9000/'

class App extends Component {
	state = {
		role: "",
		user: { },
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
				this.setAppUser(data.user)
				this.setRole(data.user.role)
				this.setCerts(data.certifications)
			})
		}
	}

	setCerts = (certs) => {
		this.setState({ certifications: certs})
	}

	setRole = (role) => {
		this.setState({ role })
	}

	setAppUser = (user) => {
		this.setState({ user })
	}

	logOut = () => {
		localStorage.removeItem('token')
		this.setState({
				id: "",
				role: "",
				user: {},
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
					<Profile user={ this.state.user } certifications={ this.state.certifications } setAppUser={ this.setAppUser } role={ this.state.role } setRole={ this.setRole }/>
					:
					<LoginContainer	setRole={ this.setRole } role={ this.state.role } setAppUser={ this.setAppUser } setCerts={ this.setCerts }/>
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
