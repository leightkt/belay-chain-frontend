import './AddCertForm.css'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ADD_CERTIFICATION } from '../Redux/Types'
import SearchForm from './SearchForm'
import AddForm from './AddForm'
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
                this.props.addCert(result)
                this.props.routerProps.history.push('/')
            }
            
        })
    }

    render(){
        return(
            <>
            <section className="add-or-lookup">
                <AddForm 
                    addCertification={ this.addCertification }
                    member_id={ this.state.member_id }
                    email={ this.state.email }
                    cert_type={ this.state.cert_type }
                    handleChange={ this.state.handleChange }
                />
                <SearchForm 
                    handleChange={ this.handleChange } 
                    email={ this.state.email }
                    first_name={ this.state.first_name }
                    last_name={ this.state.last_name }
                    findUser={ this.findUser }
                />
                { this.state.errors ? <p className="errors">{ this.state.errors }</p> : null }
            </section>
            <Link className="back-link" to="/">BACK</Link>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gym_id: state.user.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCert: (certification) => dispatch({ type: ADD_CERTIFICATION, certification })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCertForm)