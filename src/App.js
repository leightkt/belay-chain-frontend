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

	render() {
		return (
		<div className="App">
			<Header	/>
			<Main	/>
			<Footer	/>
		</div>
		);
	}
}

export default App;
