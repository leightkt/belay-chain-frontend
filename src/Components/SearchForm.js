import './SearchForm.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const backendUsersURL = 'http://localhost:9000/'


function SearchForm ({ setMainEmail, setErrors, setMemberId }) {
    const [email, setEmail] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const gym_id = useSelector(state => state.user.id)
    
    const findUser = (event) => {
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
                    email,
                    first_name,
                    last_name,
                    gym_id
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                setErrors(data.errors)
                setMemberId("")
                setMainEmail("")
                setEmail("")
            } else {
                setMemberId(data.member_id)
                setMainEmail(data.email)
                setFirst_name("")
                setLast_name("")
                setEmail("")
                setErrors("")
            }
        })
    }

    const handleChange = (event) => {
        let { name, value } = event.target

        switch(name) {
            case "email":
                setEmail(value)
                break
            case "first_name":
                setFirst_name(value)
                break
            case "last_name":
                setLast_name(value)
                break
            default:
                return null
        }
    }
    return (
        <form className="lookup" onSubmit={ findUser }>
            <h2>Look Up User</h2>
            <label>Email:</label>
            <input type="email" name="email" placeholder="EMAIL" onChange={ handleChange } value={ email }/>
            <label>First Name:</label>
            <input type="text" name="first_name" placeholder="FIRST NAME" onChange={ handleChange } value={ first_name }/>
            <label>Last Name:</label>
            <input type="text" name="last_name" placeholder="LAST NAME" onChange={ handleChange } value={ last_name }/>
            <input type="submit" value="FIND MEMBER" />
        </form>
    )
}

export default SearchForm