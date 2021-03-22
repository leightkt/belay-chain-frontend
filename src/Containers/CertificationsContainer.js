import CertCard from '../Components/CertCard'
import './CertificationsContainer.css'

function CertificationsContainer ({ certifications }) {

    const displayCertifications = () => {
        return certifications.map(cert => {
            return <CertCard key={ cert.index } cert={ cert }/>
        })
    }

    return(
        <section className="cert-container">
            { displayCertifications() }
        </section>
    )
}

export default CertificationsContainer