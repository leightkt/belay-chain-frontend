import './DeleteAccount.css'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER, SET_ROLE } from '../Redux/Types'
const backendUsersURL = 'http://localhost:9000/'


function DeleteAccount ({ deleteAccount, toggleConfirmDelete, setroleURL, setErrors, routerProps }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    deleteAccount = () => {

        const roleURL = setroleURL()
        fetch(`${backendUsersURL}${roleURL}/${user.id}`, {
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
                    setErrors(data.errors)
                } else {
                    setErrors("")
                    dispatch({ type: SET_USER, user: {} })
                    dispatch({ type: SET_ROLE, role: "" })
                    localStorage.removeItem('token')
                    routerProps.history.push('/')
                }
            })
    }

    const cancelDelete = () => {
        toggleConfirmDelete()
        setErrors("")
    }

    return(
        <div className="delete-account">
            <p>Are you sure you want to delete your account?</p>
            <button onClick={ deleteAccount }>CONFIRM</button>
            <button onClick={ cancelDelete }>CANCEL</button>
        </div>
    )
}

export default DeleteAccount