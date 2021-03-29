import './Profile.css'
import CertificationsContainer from './CertificationsContainer'
import { Component } from 'react'
import { connect } from 'react-redux'
import { SET_USER, SET_ROLE } from '../Redux/Types'
import Climber from '../Assets/climber.jpg'
import Search from '../Components/Search'
import AdminActivities from './AdminActivities'
import DeleteAccount from '../Components/DeleteAccount'
import UpdateForm from '../Components/UpdateForm'

const backendUsersURL = 'http://localhost:9000/'

class Profile extends Component {
    state = {
        editProfile: false,
        confirmDelete: false
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
                    userProfile.push(<p className={ key }>{ this.props.user[`${key}`] }</p>)
                } else {
                    if (key !== "gym_member_id" && key !== "gym") {
                        userProfile.push(<label>{ key }</label>)
                        userProfile.push(<input name={ key } value={ this.state[`${key}`] } onChange={ this.handleChange } placeholder={ key }/>)
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
        this.setState({ 
            editProfile: !this.state.editProfile, 
            errors: ""
        })
    }

    userUpdate = () => {
        const userdata = {}
        for (let key in this.state){
            if(key !== "editProfile") {
                userdata[`${key}`] =  this.state[key]
            }
        }

        const roleURL = this.setroleURL()

        if(this.state.editProfile === true){
            fetch(`${backendUsersURL}${roleURL}/${this.props.user.id}`, {
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
                        this.props.setUser(data.user)
                        this.setState({ errors: "" })
                    }
                })
        }
        this.setState({ editProfile: !this.state.editProfile })
    }

    setroleURL = () => {
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
        return roleURL
    }
    
    askforDeleteConfirmation = () => {
        this.toggleConfirmDelete()
    }

    deleteAccount = () => {

        const roleURL = this.setroleURL()
        fetch(`${backendUsersURL}${roleURL}/${this.props.user.id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": `Bearer: ${localStorage.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    this.setState({ errors: data.errors[0] })
                } else {
                    this.setState({ errors: "" })
                    this.props.setUser({})
                    this.props.setRole("")
                    localStorage.removeItem('token')
                }
            })
    }

    toggleConfirmDelete = () => {
        this.setState({ confirmDelete: !this.state.confirmDelete })
    }

    render(){
        const { role } = this.props
        
        return(
            <>
                <section className="profile">

                    <img className="climber-image hide-on-small" src={ Climber} alt="a climber haning from a rope in gym" />

                        { this.state.confirmDelete
                            ? 
                                <DeleteAccount deleteAccount={ this.deleteAccount } toggleConfirmDelete={ this.toggleConfirmDelete }/>
                            : 
                                <>
                                    { !this.props.user.first_name && role === "member" 
                                        ? 
                                            <p className="first-time-user">First time here? Click edit to update your information and reset your password.</p> 
                                        : null 
                                    }
                                    <UpdateForm 
                                        editProfile={ this.state.editProfile }
                                        displayUser={ this.displayUser }
                                        password={ this.state.password }
                                        handleChange={ this.handleChange }
                                        userUpdate = { this.userUpdate }
                                        toggleEdit={ this.toggleEdit }
                                        askforDeleteConfirmation={ this.askforDeleteConfirmation }
                                        errors={ this.state.errors }/>
                                </>
                        }

                </section>

                { role === "gym" 
                    ? <Search />
                    : null 
                }

                { role === "admin"
                    ? <AdminActivities />
                    : <CertificationsContainer />
                }

            </>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        role: state.role,
        user: state.user,
        certifications: state.certifications,
        searchTerm: state.searchTerm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch({ type: SET_USER, user }),
        setRole: (role) => dispatch({ type: SET_ROLE, role })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)