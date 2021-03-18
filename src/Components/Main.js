import Section from '../Containers/Section'
import LoginForm from './LoginForm'
import './Main.css'

function Main ({ setRole, role, setUserID }) {

    return(
        <main>
            {role
            ? <LoginForm  role={ role } setUserID={ setUserID } setRole={ setRole }/>
            : <Section setRole={ setRole } />
            }
        </main>
    )
}

export default Main