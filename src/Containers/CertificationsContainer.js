import CertCard from '../Components/CertCard'
import './CertificationsContainer.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const backendUsersURL = 'http://localhost:9000/'

function CertificationsContainer ({ match }) {
    const certifications = useSelector(state => state.certifications)
    const role = useSelector(state => state.role )
    const searchTerm = useSelector(state => state.searchTerm)

    const [ certs, setCerts ] = useState([])
    const [ loaded, setLoad ] = useState(false)
    const [ errors, setErrors ] = useState("")
    const [ message, setMessage ] = useState("")

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
                    if (result.errors) {
                        setErrors(result.errors)
                    } else {
                        setCerts([result])
                        setLoad(true)
                        if (result.data.cert_type === "Revoke Previous Certification") {
                            setMessage("Certification Revoked")
                        } else {
                            setMessage("Certification Verified")
                        }
                    }
                })
        }

    }

    const displayedCerts = () => {
		return certifications.filter(certification => {
			if (!searchTerm) {
				return true
			} else {
				return certification.first_name.toLowerCase().includes(searchTerm.toLowerCase())
				|| certification.last_name.toLowerCase().includes(searchTerm.toLowerCase())
				|| certification.email.toLowerCase().includes(searchTerm.toLowerCase())
			}
		})
	}

    return(
        <div className="cert-wrapper">
            <section className="cert-container">
                { loaded ? displayCertifications(certs) : null}
                { certifications ? displayCertifications(displayedCerts(certifications)) : null }
            </section>
            { certifications 
                ? null
                :
                    <>
                        <p className="verify-message">{ errors ? "Cerification Can Not Be Verified" : null }</p>
                        <p className="verify-message">{ message ? message : null }</p>
                        <Link className="back-link" to="/">BACK</Link>
                    </>
            }
        </div>
    )
}

export default CertificationsContainer