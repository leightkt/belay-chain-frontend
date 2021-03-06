import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, SET_ROLE, SET_CERTIFICATIONS } from './Redux/Types'


import Header from './Components/Header';
import Footer from './Components/Footer';
import Profile from './Containers/Profile';
import LoginContainer from './Containers/LogInContainer';
import CertFormContainer from './Containers/CertFormContainer'
import CertificationsContainer from './Containers/CertificationsContainer';
import QRcode from './Components/QRcode';
import PrivateRoute from './Components/PrivateRoute'
import About from './Components/About';


const backendUsersURL = 'http://localhost:9000/'

function App () {

	const dispatch = useDispatch()
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
		dispatch({ type:  SET_CERTIFICATIONS, certifications: [] })
		dispatch({ type: SET_USER, user: {} })
		dispatch({ type: SET_ROLE, role: "" })
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

				<PrivateRoute path="/addcert" component={ CertFormContainer } /> 

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
