import './Header.css'
import { Link } from 'react-router-dom'

function Header ({ role, userID }) {

    return(
        <header>
            <h1>BelayChain</h1>
            <p>Certified Catches</p>
            { 
                role === "gym" && userID
                ? <Link to="/addcert" className="add-cert">Add Certification</Link>
                : null
            }
        </header>
    )
}

export default Header