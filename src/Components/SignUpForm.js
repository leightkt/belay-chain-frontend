import './SignUpForm.css'
import { Component } from 'react'
const backendUsersURL = 'http://localhost:9000/'

class SignUpForm extends Component {
    state = {
        name: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        email: "",
        password: "",
        phone: ""
    }

    handleChange = (event) => {
        let { name, value } = event.target

        switch(name) {
            case "name":
                this.setState({ name: value })
                break
            case "street_address":
                this.setState({ street_address: value })
                break
            case "city":
                this.setState({ city: value })
                break
            case "state":
                this.setState({ state: value })
                break
            case "zip_code":
                this.setState({ zip_code: value })
                break
            case "phone":
                this.setState({ phone: value })
                break
            case "email":
                this.setState({ email: value })
                break
            case "password":
                this.setState({ password: value })
                break
            default:
                return null
        }

    }

    signup = (event) => {
        event.preventDefault()
        const data = {
            name: this.state.name,
            street_address: this.state.street_address,
            city: this.state.city,
            state: this.state.state,
            zip_code: this.state.zip_code,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
        }

		fetch(`${backendUsersURL}gyms`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
            body: JSON.stringify({
                user: data
            })
		})
            .then(response => response.json())
            .then(console.log)
            .then(data => {
                if (data.errors) {
                    this.setState({ errors: data.errors })
                } else {
                    this.setState({
                        name: "",
                        street_address: "",
                        city: "",
                        state: "",
                        zip_code: "",
                        email: "",
                        password: "",
                        phone: ""
                    })
                    this.props.setUserID(data.user.id)
                    localStorage.setItem('token', data.token)
                }
            })
    }

    render() {
        return(
            <form onSubmit={ this.signup }>
                <label>Gym Name:</label>
                <input name="name" type="text" value={ this.state.name } onChange={ this.handleChange } placeholder="GYM NAME" required />
                <label>Street Address:</label>
                <input name="street_address" type="text" value={ this.state.street_address } onChange={ this.handleChange } placeholder="STREET ADDRESS" required />
                <label>City:</label>
                <input name="city" type="text" value={ this.state.city } onChange={ this.handleChange } placeholder="CITY" required />
                <label>State:</label>
                <input name="state" type="text" value={ this.state.state } onChange={ this.handleChange } placeholder="STATE" required />
                <label>Zip Code:</label>
                <input name="zip_code" type="postal" value={ this.state.zip_code } onChange={ this.handleChange } placeholder="ZIP CODE" required />
                <label>Phone Number:</label>
                <input name="phone" type="tel" value={ this.state.phone } onChange={ this.handleChange } placeholder="PHONE" required />
                <label>Email:</label>
                <input name="email" type="text" value={ this.state.email } onChange={ this.handleChange } placeholder="EMAIL" required />
                <label>Password:</label>
                <input name="password" type="password" value={ this.state.password } onChange={ this.handleChange } placeholder="PASSWORD" required />
                <input type="submit" value="SIGN UP"/>
            </form>
        )
    }
}

export default SignUpForm
