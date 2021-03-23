import './App.css';
import { Component } from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginContainer from './Containers/LogInContainer';
import Profile from './Containers/Profile';
import AddCertForm from './Components/AddCertForm'
import { Redirect, Route, Switch } from 'react-router-dom'
import CertificationsContainer from './Containers/CertificationsContainer';
import QRcode from './Components/QRcode';

const backendUsersURL = 'http://localhost:9000/'

class App extends Component {
	state = {
		role: "",
		user: {},
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

	

	render() {
		return (
		<div className="App">
			<Header	role={ this.state.role } userID={ this.state.user.id }/>
			<Switch>
				<Route path="/" exact render={() => {
						return (
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
							</main>
						)
					}
				} />
				<Route path="/addcert" render={ (routerProps) => <AddCertForm { ...routerProps } gym_id={ this.state.user.id } addCertToState={ this.addCertToState }/> }/>
				<Route path="/certQR" exact render={ (routerProps) => <QRcode { ...routerProps } /> } />
				<Route path="/verifycert/:hash" render={ (routerProps) =>  <CertificationsContainer  {...routerProps } />} />
				<Redirect to="/" />
			</Switch>
			<Footer	/>
		</div>
		);
	}
}

export default App;
