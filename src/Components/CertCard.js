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
            <div className="cert-text-box">
                <p className="less-important">{ `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` }</p>
                
                { role === "gym" || role === "verify"
                    ?   
                        <>
                            <p className="less-important">{ cert.data.user_member_number }</p>
                            <p className="important">{ cert.first_name } { cert.last_name }</p>
                            {/* <p className="important">{ cert.last_name }</p> */}
                            <p className="less-important">{ cert.email }</p>
                        </>
                    : 
                        <p className="important">{ cert.gym }</p>
                }

                <p className="important">{ cert.data.cert_type }</p>
                
                { role === "verify" 
                    ? 
                        <p className="important">{ cert.gym }</p> 
                    : 
                        <Link 
                            to={{ pathname: '/certQR', state: { hash: cert.hash } }} 
                            className="view-cert" >
                        View Certification
                        </Link> 
                }
            </div>
        </div>
    )
}

export default CertCard