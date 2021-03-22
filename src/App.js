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
		certifications: [
			{
				id: "605504d2d0355b3b6b2ef51e",
				index: 0,
				timestamp: 0,
				data: {
					gym_id: 21,
					gym_member_id: 1234,
					cert_type: "Lead"
				},
				previousHash: "",
				hash: "",
				nonce: 1234
			},
			{
				id: "605504d2d0355b3b6b2ef51e",
				index: 1,
				timestamp: 0,
				data: {
					gym_id: 21,
					gym_member_id: 1234,
					cert_type: "Lead"
				},
				previousHash: "",
				hash: "",
				nonce: 1234
			}
		]
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
				this.setState({ id: data.user.id,
					role: data.user.role })
			})
		}
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
					<Profile user={ this.state.user } certifications={ this.state.certifications } setAppUser={ this.setAppUser } role={ this.state.role }/>
					:
					<LoginContainer	setRole={ this.setRole } role={ this.state.role } setAppUser={ this.setAppUser }/>
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
