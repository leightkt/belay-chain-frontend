import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, SET_ROLE, SET_CERTIFICATIONS } from './Redux/Types'


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
	const user = useSelector(state => state.user)

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
				dispatch({ type:  SET_CERTIFICATIONS, certifications: data.certifications })
				dispatch({ type: SET_USER, user: data.user })
				dispatch({ type: SET_ROLE, role: data.user.role })
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
		<main>
		<Switch>
			<Route path="/login" render={(routerProps) => <LoginContainer { ...routerProps }/> } />

			<Route path="/verifycert/:hash" render={ (routerProps) => <CertificationsContainer  {...routerProps } /> } />

			<Route path="/about" render={ () => <About /> } />

			<PrivateRoute path="/certQR" component={ QRcode } />

			<PrivateRoute path="/addcert" component={ AddCertForm } /> 

			<PrivateRoute path="/" component={ Profile } />

			<Redirect to="/" />

		</Switch>
		{ user.id ? <button className="logout-button" onClick={ logOut }>LOG OUT</button> : null }
		</main>
		<Footer	/>
	</div>
	);
}

export default App;
