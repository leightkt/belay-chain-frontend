import './AddCertForm.css'
import { Component } from 'react'
import { Link } from 'react-router-dom'
const backendUsersURL = 'http://localhost:9000/'

class AddCertForm extends Component {
    state = {
        member_id: "",
        cert_type: "Top Rope",
        email: "",
        first_name: "",
        last_name: "",
        errors: ""
    }

    handleChange = (event) => {
        let { name, value } = event.target

        switch(name) {
            case "member_id":
                this.setState({ member_id: value })
                break
            case "email":
                this.setState({ email: value })
                break
            case "cert_type":
                this.setState({ cert_type: value })
                break
            case "first_name":
                this.setState({ first_name: value })
                break
            case "last_name":
                this.setState({ last_name: value })
                break
            default:
                return null
        }
    }

    findUser = (event) => {
        event.preventDefault()

        fetch(`${backendUsersURL}findMember`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                user: {
                    email: this.state.email,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    gym_id: this.props.gym_id
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                this.setState({ 
                    errors: data.errors,
                    member_id: "",
                    email: "" })
            } else {
                this.setState({ 
                    member_id: data.member_id,
                    email: data.email,
                    first_name: "",
                    last_name: "",
                    errors: ""
                })
            }
        })
    }

    addCertification = (event) => {
        event.preventDefault()

        fetch(`${backendUsersURL}addCertification`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                user: {
                    cert_type: this.state.cert_type,
                    gym_member_id: parseInt(this.state.member_id),
                    gym_id: this.props.gym_id,
                    email: this.state.email
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.errors){
                this.setState({ 
                    errors: result.errors,
                    member_id: "",
                    email: "" })
            } else {
                this.props.addCertToState(result)
                this.props.history.push('/')
            }
            
        })
    }

    render(){
        return(
            <section className="add-or-lookup">
                <form className="add-cert-form" onSubmit={ this.addCertification }>
                    <h2>Add Belay Certificaiton</h2>
                    <label>Member ID:</label>
                    <input type="text" name="member_id" placeholder="MEMBER ID" value={ this.state.member_id } onChange={ this.handleChange } required/>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="EMAIL" onChange={ this.handleChange } value={ this.state.email } required/>
                    <label>Certification Type:</label>
                    <select name="cert_type" onChange={ this.handleChange } value={ this.state.cert_type } required>
                        <option>Top Rope</option>
                        <option>Lead</option>
                        <option>Revoke Previous Certificaiton</option>
                    </select>
                    <input type="submit" value="ON BELAY" />
                </form>
                <form className="lookup" onSubmit={ this.findUser }>
                    <h2>Look Up User</h2>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="EMAIL" onChange={ this.handleChange } value={ this.state.email }/>
                    <label>First Name:</label>
                    <input type="text" name="first_name" placeholder="FIRST NAME" onChange={ this.handleChange } value={ this.state.first_name }/>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" placeholder="LAST NAME" onChange={ this.handleChange } value={ this.state.last_name }/>
                    <input type="submit" value="FIND MEMBER" />
                    { this.state.errors ? <p>{ this.state.errors }</p> : null }
                </form>
                <Link to="/">BACK</Link>
            </section>
        )
    }
}

export default AddCertForm