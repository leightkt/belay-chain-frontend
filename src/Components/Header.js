import './Header.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../Assets/belay-chain-logo.png'

function Header () {
    const role = useSelector(state => state.role)
    const userID = useSelector(state => state.user.id)

    return(
        <header>
            {/* <h1>BelayChain</h1> */}
            <img className="logo" src={ Logo } alt="a chain of belay devices" />
            <p className="hide-on-small">Certified Catches</p>
            <Link className="about-link" to="about" >ABOUT</Link>

            { role === "gym" && userID
                ? <Link to="/addcert" className="add-cert">Add Certification</Link>
                : null
            }
            
        </header>
    )
}

export default Header