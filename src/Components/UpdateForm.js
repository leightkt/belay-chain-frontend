import './UpdateForm.css'
import { Component } from 'react'

class UpdateForm extends Component {

    render(){
        const { editProfile, displayUser, password, handleChange, userUpdate, toggleEdit, askforDeleteConfirmation } = this.props
        return(
            <form className="update">
                
                { displayUser() }

                { editProfile
                    ?   
                        <>
                            <label>Password</label>
                            <input type="password" name="password" value={ password } onChange={ handleChange } placeholder="Password" className="password-edit"/>
                            <div className="update-div">
                                <button onClick={ userUpdate }>UPDATE</button>
                                <button onClick={ toggleEdit }>CANCEL</button>
                                <button onClick={ askforDeleteConfirmation }>DELETE</button>
                            </div>
                            
                        </>
                    : 
                        <button class="edit" onClick={ toggleEdit }>EDIT</button>
                }

            </form>
        )
    }
}

export default UpdateForm