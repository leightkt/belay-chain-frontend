import CertCard from '../Components/CertCard'
import './CertificationsContainer.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const backendUsersURL = 'http://localhost:9000/'

function CertificationsContainer ({ certifications, role, match }) {
    const [ certs, setCerts ] = useState([])
    const [ loaded, setLoad ] = useState(false)
    const [ errors, setErrors ] = useState("")

    useEffect(() => {
        verifyAndDisplay()
    }, [])

    const displayCertifications = (certArray) => {
        return certArray.map(cert => {
            return <CertCard key={ cert.index } cert={ cert } role={ loaded ? "verify" : role } />
        })
    }

    const verifyAndDisplay = () => {
        if (match) {
            fetch(`${backendUsersURL}verify`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({ hash: match.params.hash })
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.errors) {
                        setErrors(result.errors)
                    } else {
                        setCerts([...certs, result])
                        setLoad(true)
                    }
                })
        }

    }

    return(
        <div className="cert-wrapper">
            <section className="cert-container">
                { loaded ? displayCertifications(certs) : null}
                { certifications ? displayCertifications(certifications) : null }
            </section>
            { certifications 
                ? null
                :
                    <>
                        <p className="verify-message">{errors ? "Cerification Can Not Be Verified" : "Certification Verified"}</p>
                        <Link className="back-link" to="/">BACK</Link>
                    </>
            }
        </div>
    )
}

export default CertificationsContainer