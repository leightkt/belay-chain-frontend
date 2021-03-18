import LogInButtonSection from '../Containers/LogInButtonSection'
import LoginForm from './LoginForm'
import './Main.css'

function Main ({ setRole, role, setUser }) {

    return(
        <main>
            {role
            ? <LoginForm  role={ role } setUser={ setUser } setRole={ setRole }/>
            : <LogInButtonSection setRole={ setRole } />
            }
        </main>
    )
}

export default Main