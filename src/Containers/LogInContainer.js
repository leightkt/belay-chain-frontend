import './LoginContainer.css'
import LogInButtonSection from './LogInButtonSection'
import { useSelector } from 'react-redux'
import LogOrSignContainer from './LogOrSignContainer'

function LoginContainer ({ ...routerProps }) {
    const role = useSelector(state => state.role)

    return(
        <section>
            { role ? <LogOrSignContainer { ...routerProps }/> : <LogInButtonSection /> }
        </section>
    )
}

export default LoginContainer