import { Component } from 'react'
import SignUpForm from './SignUpForm'
const backendUsersURL = 'http://localhost:9000/'

class LoginForm extends Component {


    state = {
        username: "",
        password: "",
        email: "",
        signup: false,
        role: this.props.role
    }

    

    handleChange = (event) => {
        let { name, value } = event.target

        switch(name) {
            case "email":
                this.setState({ email: value })
                break
            case "password":
                this.setState({ password: value })
                break
            case "username":
                this.setState({ username: value })
                break
            default:
                return null
        }
    }

    handleClick = (event) => {
        this.setState({ signup: !this.state.signup })
    }

    login = (event) => {
        event.preventDefault()
        console.log("hit")
        let data = {}

        if (this.state.role === "admin") {
            data = {
                username: this.state.username,
                password: this.state.password
            }
        } else {
            data = {
                email: this.state.email,
                password: this.state.password
            }
        }

		fetch(`${backendUsersURL}${this.state.role}login`, {
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
	}

    signup = () => {

    }


    render() {
        return(
            <div>
                {
                    !this.state.signup
                    ?
                        <form onSubmit={ this.login }>
                            { this.state.role === "admin"
                            ?   <>
                                    <label>Username:</label>
                                    <input type="text" name="username" value={ this.state.username } onChange={ this.handleChange } placeholder="USERNAME"/>
                                </>
                            :   <>
                                    <label>Email:</label>
                                    <input type="email" name="email" value={ this.state.email } onChange={ this.handleChange } placeholder="EMAIL"/>
                                </>
                            }
                            
                            <label>Password:</label>
                            <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange } placeholder="PASSWORD"/>
                            <input type="submit" value="LOG IN" />
                        </form>
                    :
                    <SignUpForm />
                }
                

                { this.state.role === "gym"
                ? 
                    <button onClick={ this.handleClick }>{ this.state.signup ? "LOG IN" : "SIGN UP" }</button>
                : 
                    null
                }
                <button onClick={() => this.props.setRole("")}>HOME</button>
            </div>
        )
    }
    
}

export default LoginForm