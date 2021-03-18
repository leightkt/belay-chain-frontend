import LogInButtonSection from '../Containers/LogInButtonSection'
import LoginForm from './LoginForm'
import './Main.css'

function Main ({ setRole, role, setUserID }) {

    return(
        <main>
            {role
            ? <LoginForm  role={ role } setUserID={ setUserID } setRole={ setRole }/>
            : <LogInButtonSection setRole={ setRole } />
            }
        </main>
    )
}

export default Main