import './LoginContainer.css'
import LogInButtonSection from './LogInButtonSection'
import LoginForm from '../Components/LoginForm'
import { useSelector } from 'react-redux'

function LoginContainer ({ ...routerProps }) {
    const role = useSelector(state => state.role)

    return(
        <section>
            {role
            ? <LoginForm { ...routerProps }/>
            : <LogInButtonSection />
            }
        </section>
    )
}

export default LoginContainer