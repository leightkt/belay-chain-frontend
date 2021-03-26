import './About.css'
import { Link } from 'react-router-dom'

function About () {
    return (
        <section className="about-section">
            <h2>ABOUT</h2>
            <h3>No One Loves Having to Take ANOTHER Belay Test.</h3>
            <div className="about-div">
                <p>BelayChain records and stores belay certifications from climbing gyms securly on a blockchain.</p>
                <p>Certifications can be accessed by both gyms and members.</p>
                <p>Members get a QR code that when scanned, shows and verifies their certification.</p>
            </div>
            <h4>Get certifed. For Good.</h4>
            <Link className="back-link" to="/">BACK</Link>
        </section>
    )
}

export default About