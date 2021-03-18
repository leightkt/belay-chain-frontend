import LogInButtonSection from './LogInButtonSection'
import LoginForm from '../Components/LoginForm'
import './LoginContainer.css'

function LoginContainer ({ setRole, role, setUser }) {

    return(
        <section>
            {role
            ? <LoginForm  role={ role } setUser={ setUser } setRole={ setRole }/>
            : <LogInButtonSection setRole={ setRole } />
            }
        </section>
    )
}

export default LoginContainer