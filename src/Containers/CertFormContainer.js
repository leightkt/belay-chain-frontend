import './CertFormContainer.css'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchForm from '../Components/SearchForm'
import AddForm from '../Components/AddForm'


class CertFormContainer extends Component {
    state = {
        member_id: "",
        email: "",
        errors: ""
    }

    setErrors = (errors) => {
        this.setState({ errors })
    }

    setMemberId = (member_id) => {
        this.setState({ member_id })
    }

    setMainEmail = (email) => {
        this.setState({ email })
    }



    render(){
        return(
            <>
            <section className="add-or-lookup">
                <AddForm 
                    addCertification={ this.addCertification }
                    member_id={ this.state.member_id }
                    email={ this.state.email }
                    setMainEmail={ this.setMainEmail }
                    setMemberId={ this.setMemberId }
                    setErrors={ this.setErrors }
                    routerProps={ this.props.routerProps }
                />
                <SearchForm 
                    setMainEmail={ this.setMainEmail }
                    setErrors={ this.setErrors }
                    setMemberId={ this.setMemberId }
                />
                { this.state.errors ? <p className="errors">{ this.state.errors }</p> : null }
            </section>
            <Link className="back-link" to="/">BACK</Link>
            </>
        )
    }
}

export default CertFormContainer