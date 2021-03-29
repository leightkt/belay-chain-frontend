import './AddForm.css'

function AddForm ({ addCertification, member_id, email, cert_type, handleChange }) {
    return (
        <form className="add-cert-form" onSubmit={ addCertification }>
            <h2>Add Belay Certification</h2>
            <label>Member ID:</label>
            <input type="text" name="member_id" placeholder="MEMBER ID" value={ member_id } onChange={ this.handleChange } required/>
            <label>Email:</label>
            <input type="email" name="email" placeholder="EMAIL" onChange={ this.handleChange } value={ email } required/>
            <label>Certification Type:</label>
            <select name="cert_type" onChange={ this.handleChange } value={ cert_type } required>
                <option>Top Rope</option>
                <option>Lead</option>
                <option>Revoke Previous Certification</option>
            </select>
            <input type="submit" value="ON BELAY" />
        </form>
    )
}

export default AddForm