import './Profile.css'
import CertificationsContainer from './CertificationsContainer'
import { Component } from 'react'
const backendUsersURL = 'http://localhost:9000/'

class Profile extends Component {
    state = {
        editProfile: false
    }

    componentDidMount() {
        this.setUser(this.props.user)
    }

    setUser = (user) => {
        for (let key in user) {
            this.setState({ [`${key}`]: user[key] })
        }
    }

    displayUser = () => {
        const userProfile = []
        for (let key in this.props.user){
            if(key !== "id" && key !== "role"){
                if (this.state.editProfile === false ) {
                    userProfile.push(<p className={ key }>{ this.state[`${key}`] }</p>)
                } else {
                    if (key !== "gym_member_id" && key !== "gym") {
                        userProfile.push(<input name={ key } value={ this.state[`${key}`] } onChange={ this.handleChange }/>)
                    }
                }
                
            }
        }
        return userProfile.map(item => item)

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
            case "city":
                this.setState({ city: value })
                break
            case "name":
                this.setState({ name: value })
                break
            case "state":
                this.setState({ state: value })
                break
            case "street_address":
                this.setState({ street_address: value })
                break
            case "zip_code":
                this.setState({ zip_code: value })
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

    toggleEdit = () => {

        const userdata = {}
        for (let key in this.state){
            if(key !== "editProfile") {
                userdata[`${key}`] =  this.state[key]
            }
        }

        let roleURL = ""
        
        switch(this.props.role){
            case "member":
                roleURL = "members"
                break
            case "gym":
                roleURL = "gyms"
                break
            case "admin":
                roleURL = "administrators"
                break
            default: 
                return null
        }

        if(this.state.editProfile) {
            fetch(`${backendUsersURL}${roleURL}/${this.state.id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Authorization": `Bearer: ${localStorage.token}`
                },
                body: JSON.stringify({
                    user: userdata
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.errors) {
                        this.setState({ errors: data.errors[0] })
                    } else {
                        this.props.setAppUser(data.user)
                        this.setState({ errors: "" })
                    }
                })
        }
        this.setState({ editProfile: !this.state.editProfile })
    }
    
    render(){
        return(
            <>
                <section className="profile">
                        { this.displayUser() }
                        {this.state.editProfile
                            ? <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange } placeholder="Password"/>
                            : null
                        }
                        { this.state.errors
                                ? <p>{ this.state.errors }</p>
                                : null
                        }
                        <button class="edit" onClick={ this.toggleEdit }>EDIT</button>
                        {this.state.editProfile
                            ? <button onClick={ this.deleteAccount }>DELETE</button>
                            : null 
                        }
                </section>
                <CertificationsContainer certifications={ this.props.certifications }/>
            </>
        )
    }
    
}

export default Profile