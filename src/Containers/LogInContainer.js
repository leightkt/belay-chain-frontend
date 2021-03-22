import LogInButtonSection from './LogInButtonSection'
import LoginForm from '../Components/LoginForm'
import './LoginContainer.css'

function LoginContainer ({ setRole, role, setAppUser }) {

    return(
        <section>
            {role
            ? <LoginForm  role={ role } setAppUser={ setAppUser } setRole={ setRole }/>
            : <LogInButtonSection setRole={ setRole } />
            }
        </section>
    )
}

export default LoginContainer