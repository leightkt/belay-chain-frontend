import './Header.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header () {
    const role = useSelector(state => state.role)
    const userID = useSelector(state => state.user.id)

    return(
        <header>
            <h1>BelayChain</h1>
            <p>Certified Catches</p>
            <Link className="about-link" to="about" >ABOUT</Link>

            { role === "gym" && userID
                ? <Link to="/addcert" className="add-cert">Add Certification</Link>
                : null
            }
            
        </header>
    )
}

export default Header