import CertCard from '../Components/CertCard'
import './CertificationsContainer.css'
import { useEffect, useState } from 'react'

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
        if (match.params.hash) {
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
        <section className="cert-container">
            { loaded ? displayCertifications(certs) : null}
            { certifications ? displayCertifications(certifications) : null }
            { errors ? <p>Cerification Can Not Be Verified</p> : <p>Certification Verified</p>}
        </section>
    )
}

export default CertificationsContainer