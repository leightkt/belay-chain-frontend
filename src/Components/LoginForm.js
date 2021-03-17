import { Component } from 'react'
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
        const value = event.target.value
        switch(event.target.name) {
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

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.state.signup) {
            console.log("sign up")
        } else {
            console.log("login")
            this.login()
        }
    }

    login = () => {
        console.log("hit")
        let body = {}

        if (this.state.role === "admin") {
            body = {
                username: this.state.username,
                password: this.state.password
            }
        } else {
            body = {
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
                body
            })
		})
            .then(response => response.json())
            .then(console.log)
	}

    render(){
        return(
            <div>
                <form onSubmit={ this.handleSubmit }>
                    { this.state.signup === false
                    ?  
                        <h2>LOG IN</h2>
                    :   
                        <h2>SIGN UP</h2>
                    }
                    { this.state.role === "admin"
                    ?   <>
                            <label>Username:</label>
                            <input type="text" name="username" value={ this.state.username } onChange={ this.handleChange }/>
                        </>
                    :   <>
                            <label>Email:</label>
                            <input type="email" name="email" value={ this.state.email } onChange={ this.handleChange }/>
                        </>
                    }
                    
                    <label>Password:</label>
                    <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange }/>
                    <input type="submit" value="LOG IN" />
                </form>
                { this.state.role === "gym"
                ? 
                    <button onClick={ this.handleClick }>{ this.state.signup ? "LOG IN" : "SIGN UP" }</button>
                : 
                    null
                }
            </div>
        )
    }
    
}

export default LoginForm