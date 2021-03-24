import './Footer.css'
import Github from '../Assets/github.png'
import Blockimage from '../Assets/block.jpeg'

function Footer () {

    return(
        <footer>
            <a href="https://github.com/leightkt" className="hide-on-small"><img src={Github} alt="github logo" className="github-logo" /></a>
            <p className="about-title">About the Dev</p>
            <div className="about-dev">
                <p>Kat Leight</p>
                <p className="hide-on-small">Full Stack Software Engineer and Climber in Denver, CO</p>
                <p>Explorer of mountains and new technology</p>
            </div>
            <img src={ Blockimage } alt="an orange block" className="block-image" />
        </footer>
    )
}

export default Footer