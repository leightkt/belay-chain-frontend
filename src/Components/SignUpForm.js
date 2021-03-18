import './SignUpForm.css'
import { Component } from 'react'

class SignUpForm extends Component {
    state = {
        name: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        email: "",
        password: "",
        phone: "",
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

    render() {
        return(
            <form>
                <label>Gym Name:</label>
                <input name="name" value={ this.state.name } onChange={ this.handleChange } placeholder="GYM NAME"/>
                <label>Street Address:</label>
                <input name="street_address" value={ this.state.street_address } onChange={ this.handleChange } placeholder="STREET ADDRESS"/>
                <label>City:</label>
                <input name="city" value={ this.state.city } onChange={ this.handleChange } placeholder="CITY"/>
                <label>State:</label>
                <input name="state" value={ this.state.state } onChange={ this.handleChange } placeholder="STATE"/>
                <label>Zip Code:</label>
                <input name="zip_code" value={ this.state.zip_code } onChange={ this.handleChange } placeholder="ZIP CODE"/>
                <label>Phone Number:</label>
                <input name="phone" value={ this.state.phone } onChange={ this.handleChange } placeholder="PHONE"/>
                <label>Email:</label>
                <input name="email" value={ this.state.email } onChange={ this.handleChange } placeholder="EMAIL"/>
                <label>Password:</label>
                <input name="password" value={ this.state.password } onChange={ this.handleChange } placeholder="PASSWORD"/>
            </form>
        )
    }
}

export default SignUpForm
