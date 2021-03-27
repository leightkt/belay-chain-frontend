import './LogInButtonSection.css'
import { useDispatch } from 'react-redux'

function LogInButtonSection () {
    const dispatch = useDispatch()

    const handleClick = (event) => {
        switch(event.target.id) {
            case "gym-button":
                dispatch({ type: "SET_ROLE", role: "gym" })
                break
            case "member-button":
                dispatch({ type: "SET_ROLE", role: "member" })
                break
            case "admin-button":
                dispatch({ type: "SET_ROLE", role: "admin" })
                break
            default:
                return null
        }


    }

    return(
        <section className="login-buttons" onClick={ handleClick }>
            <button id="gym-button">GYM</button>
            <button id="member-button">MEMBER</button>
            <button id="admin-button">ADMINISTRATOR</button>
        </section>
    )
}

export default LogInButtonSection