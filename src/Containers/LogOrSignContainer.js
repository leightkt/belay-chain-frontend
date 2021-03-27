import './LogOrSignContainer.css'
import { useSelector, useDispatch } from 'react-redux'
import { SET_ROLE } from '../Redux/Types'
import { useState } from 'react'
import LoginForm from '../Components/LoginForm'
import SignUpForm from '../Components/SignUpForm'

function LogOrSignContainer ({ ...routerProps }) {
    const dispatch = useDispatch()
    const role = useSelector(state => state.role)
    const [signup, setSignup] = useState(false)

    const handleClick = (event) => {
        setSignup(!signup)
    }

    return(
        <div>
            { !signup
                ?
                        <LoginForm { ...routerProps }/>
                    :
                        <SignUpForm { ...routerProps } />
            }
            
            { role === "gym"
                    ? 
                        <button className="signup-or-login" onClick={ handleClick }>{ signup ? "LOG IN" : "SIGN UP" }</button>
                    : 
                        null
            }

            <button 
                className="home-button" 
                onClick={ () => dispatch({ type: SET_ROLE, role: "" }) }>
                HOME
            </button>
        </div>
    )
}

export default LogOrSignContainer