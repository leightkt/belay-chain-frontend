import './App.css';
// import { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


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

function App () {
	const dispatch = useDispatch()
	const certifications = useSelector(state => state.certifications)
	const searchTerm = useSelector(state => state.searchTerm)

	const authoriz_user = () => {
		if(localStorage.getItem("token")) {
			fetch(`${backendUsersURL}profile`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${localStorage.token}`
				}
			})
			.then(response => response.json())
			.then(data => {
				dispatch({ type:  "SET_CERTIFICATIONS", certifications: data.certifications })
				dispatch({ type: "SET_USER", user: data.user })
				dispatch({ type: "SET_ROLE", role: data.user.role })
			})
		}
	}

	useEffect(authoriz_user, [])

	const logOut = () => {
		localStorage.removeItem('token')
		this.setState({
				id: "",
				role: "",
				user: {},
				certifications: []
		})
	}

	const addCertToState = (newCert) => {
		const certifications = this.state.certifications.filter(certification => certification.index !== newCert.index)
		this.setState({ certifications: [...certifications, newCert]})
	}

	const updateSearchTerm = (event) => {
		this.setState({
			searchTerm: event.target.value
		})
	}

	const displayedCerts = () => {
		return certifications.filter(certification => {
			if (!searchTerm) {
				return true
			} else {
				return certification.first_name.toLowerCase().includes(searchTerm.toLowerCase())
				|| certification.last_name.toLowerCase().includes(searchTerm.toLowerCase())
				|| certification.email.toLowerCase().includes(searchTerm.toLowerCase())
			}
		})
	}

	return (
	<div className="App">
		<Header />
		{/*<main>
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
			? <button className="logout-button" onClick={ logOut }>LOG OUT</button>
			: null
		}
		</main>
		<Footer	/> */}
	</div>
	);
}

export default App;
