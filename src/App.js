import './App.css';
import { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'


import Header from './Components/Header';
import Footer from './Components/Footer';
import Profile from './Containers/Profile';
import LoginContainer from './Containers/LogInContainer';
import AddCertForm from './Components/AddCertForm'
import CertificationsContainer from './Containers/CertificationsContainer';
import QRcode from './Components/QRcode';
import PrivateRoute from './Components/PrivateRoute'
import About from './Components/About';


const backendUsersURL = 'http://localhost:9000/'

class App extends Component {
	state = {
		role: "",
		user: {},
		certifications: [],
		searchTerm: "",
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

	setCerts = (certifications) => {
		this.setState({ certifications })
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

	addCertToState = (newCert) => {
		const certifications = this.state.certifications.filter(certification => certification.index !== newCert.index)
		this.setState({ certifications: [...certifications, newCert]})
	}

	updateSearchTerm = (event) => {
		this.setState({
			searchTerm: event.target.value
		})
	}

	displayedCerts = () => {
		return this.state.certifications.filter(certification => {
			if (!this.state.searchTerm) {
				return true
			} else {
				return certification.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
				|| certification.last_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
				|| certification.email.toLowerCase().includes(this.state.searchTerm.toLowerCase())
			}
		})
	}

	render() {
		return (
		<div className="App">
			<Header	role={ this.state.role } userID={ this.state.user.id }/>
			<main>
			<Switch>

				<Route 
					path="/login" 
					render={(routerProps) => <LoginContainer	
							setRole={ this.setRole } 
							role={ this.state.role } 
							setAppUser={ this.setAppUser } 
							setCerts={ this.setCerts }
							{ ...routerProps }/> } 
				/>

				<Route 
					path="/verifycert/:hash" 
					render={ 
						(routerProps) => <CertificationsContainer  {...routerProps } /> 
					}
				/>
				<Route
					path="/about"
					render={ () => <About /> }
				/>
				<PrivateRoute 
					path="/certQR" 
					component={ QRcode }
				/>

				<PrivateRoute 
					path="/addcert" 
					component={ AddCertForm }
					gym_id={ this.state.user.id } 
					addCertToState={ this.addCertToState }
				/> 

				<PrivateRoute
					path="/" 
					component={ Profile }
					updateSearchTerm={ this.updateSearchTerm }
					searchTerm={ this.state.searchTerm }
					user={ this.state.user } 
					certifications={ this.state.certifications } 
					displayedCerts = { this.displayedCerts }
					setAppUser={ this.setAppUser } 
					role={ this.state.role } 
					setRole={ this.setRole } 
				/>
				
				<Redirect to="/" />

			</Switch>
			{
				this.state.user.id
				? <button onClick={ this.logOut }>LOG OUT</button>
				: null
			}
			</main>
			<Footer	/>
		</div>
		);
	}
}

export default App;
