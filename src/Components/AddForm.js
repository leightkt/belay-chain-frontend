import './AddForm.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CERTIFICATION } from '../Redux/Types'
const backendUsersURL = 'http://localhost:9000/'

function AddForm ({ member_id, email, setMainEmail, setMemberId, setErrors, ...routerProps }) {
    const dispatch = useDispatch()
    const [cert_type, setCert_type] = useState("Top Rope")
    const gym_id = useSelector(state => state.user.id)

    const handleChange = (event) => {
        let { name, value } = event.target

        switch(name) {
            case "member_id":
                setMemberId(value)
                break
            case "email":
                setMainEmail(value)
                break
            case "cert_type":
                setCert_type(value)
                break
            default:
                return null
        }
    }

    const addCertification = (event) => {
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
                    cert_type,
                    gym_member_id: parseInt(member_id),
                    gym_id,
                    email
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.errors){
                setErrors(result.errors)
                setMemberId("")
                setMainEmail("")
            } else {
                dispatch({ type: ADD_CERTIFICATION, result })
                routerProps.history.push('/')
            }
            
        })
    }


    return (
        <form className="add-cert-form" onSubmit={ addCertification }>
            <h2>Add Belay Certification</h2>
            <label>Member ID:</label>
            <input type="text" name="member_id" placeholder="MEMBER ID" value={ member_id } onChange={ handleChange } required/>
            <label>Email:</label>
            <input type="email" name="email" placeholder="EMAIL" onChange={ handleChange } value={ email } required/>
            <label>Certification Type:</label>
            <select name="cert_type" onChange={ handleChange } value={ cert_type } required>
                <option>Top Rope</option>
                <option>Lead</option>
                <option>Revoke Previous Certification</option>
            </select>
            <input type="submit" value="ON BELAY" />
        </form>
    )
}

export default AddForm