import './CertCard.css'
import { Link } from 'react-router-dom'
import Lead from '../Assets/lead.png'
import Top from '../Assets/top.png'
import Nope from '../Assets/nope.png'

function CertCard ({ cert, role }) {
    const timestamp = cert.timestamp
    const date = new Date(timestamp)

    const findIcon = () => {
        switch (cert.data.cert_type) {
            case "Lead":
                return Lead
            case "Top Rope":
                return Top
            case "Revoke Previous Certification":
                return Nope
            default:
                break;
        }
        
    }

    return (
        <div className="cert-card" >
            <img src={ findIcon() } alt="climbing icon" className="icon"/>
            <p>{ `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` }</p>
            
            { role === "gym" || role === "verify"
                ?   
                    <>
                        <p>{ cert.data.user_member_number }</p>
                        <p>{ cert.first_name }</p>
                        <p>{ cert.last_name }</p>
                        <p>{ cert.email }</p>
                    </>
                : 
                    <p>{ cert.gym }</p>
            }

            <p>{ cert.data.cert_type }</p>
            
            { role === "verify" 
                ? 
                    <p>{ cert.gym }</p> 
                : 
                    <Link 
                        to={{ pathname: '/certQR', state: { hash: cert.hash } }} 
                        className="view-cert" >
                    View Certification
                    </Link> 
            }
            
        </div>
    )
}

export default CertCard