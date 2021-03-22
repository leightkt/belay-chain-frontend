import './AddCertForm.css'
import { Component } from 'react'
import { Link } from 'react-router-dom'

class AddCertForm extends Component {
    state = {
        member_id: "",
        cert_type: "",
        email: "",
        first_name: "",
        last_name: ""
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

    findUser = () => {

    }

    addCertification = () => {

    }

    render(){
        return(
            <>
                <secion className="add-or-lookup">
                    <form className="add-cert-form" onSubmit={ this.addCertification }>
                        <h2>Add Belay Certificaiton</h2>
                        <label>Member ID:</label>
                        <input type="text" name="member_id" placeholder="MEMBER ID" onChange={ this.handleChange }/>
                        <label>Certification Type:</label>
                        <select name="cert_type" onChange={ this.handleChange }>
                            <option>Top Rope</option>
                            <option>Lead</option>
                            <option>Revoke Previous Certificaiton</option>
                        </select>
                        <input type="submit" value="ON BELAY" />
                    </form>
                    <form className="lookup" onSubmit={ this.findUser }>
                        <h2>Look Up User</h2>
                        <label>Email:</label>
                        <input type="email" name="email" placeholder="EMAIL" onChange={ this.handleChange }/>
                        <label>First Name:</label>
                        <input type="text" name="first_name" placeholder="FIRST NAME" onChange={ this.handleChange }/>
                        <label>Last Name:</label>
                        <input type="text" name="last_name" placeholder="LAST NAME" onChange={ this.handleChange }/>
                        <input type="submit" value="FIND MEMBER" />
                    </form>
                    <Link to="/">BACK</Link>
                </secion>
            </>
        )
    }
}

export default AddCertForm