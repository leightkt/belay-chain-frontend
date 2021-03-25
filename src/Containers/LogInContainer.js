import LogInButtonSection from './LogInButtonSection'
import LoginForm from '../Components/LoginForm'
import './LoginContainer.css'

function LoginContainer ({ setRole, role, setAppUser, setCerts, ...routerProps }) {

    return(
        <section>
            {role
            ? <LoginForm  role={ role } setAppUser={ setAppUser } setRole={ setRole } setCerts={ setCerts } { ...routerProps }/>
            : <LogInButtonSection setRole={ setRole } />
            }
        </section>
    )
}

export default LoginContainer